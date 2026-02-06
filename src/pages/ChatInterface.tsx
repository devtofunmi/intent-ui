import React, { useState, useMemo } from 'react';
import { Send } from 'lucide-react';
import { 
  useTamboThread, 
  useTamboThreadInput, 
  useTamboThreadList,
  useTamboClient 
} from "@tambo-ai/react";
import { useLocation } from 'react-router-dom';

// Components
import { HistorySidebar } from '../components/layout/HistorySidebar';
import { Header } from '../components/layout/Header';
import { Canvas } from '../components/layout/Canvas';
import { ChatSidebar } from '../components/layout/ChatSidebar';

interface ChatInterfaceProps {
  onBackToLanding?: () => void;
}

interface CanvasItem {
  id: string;
  component: React.ReactNode;
  name: string;
}

const ChatInterface = React.memo(({ onBackToLanding }: ChatInterfaceProps) => {
  const location = useLocation();
  // HOOKS (Consolidated in parent for stability)
  const { thread, switchCurrentThread, startNewThread } = useTamboThread();
  const { value, setValue, submit, isPending } = useTamboThreadInput();
  const threadListQuery = useTamboThreadList();
  const client = useTamboClient();

  // Handle incoming prompt from Landing
  React.useEffect(() => {
    if (location.state?.prompt) {
      const { prompt, isNew } = location.state;
      
      // If requested, start a fresh thread first
      if (isNew) {
        startNewThread();
      }

      // Chain of events: Open Sidebar -> Set Value -> Submit
      const timer = setTimeout(() => {
        setSidebarOpen(true);
        setValue(prompt);
        
        // Secondary timeout to ensure the input state is flushed to the hook's internal context
        setTimeout(() => {
          submit(); 
        }, 200);

        // Clear state to prevent re-execution on refresh
        window.history.replaceState({}, document.title);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [location.state?.prompt]);
  
  // Auto-naming logic: call generateName when a thread is first populated or updated but lacks a name
  React.useEffect(() => {
    if (!isPending && thread?.id && !thread.name && thread.messages && thread.messages.length >= 2) {
      client.beta.threads.generateName(thread.id).then(() => {
        threadListQuery.refetch();
      }).catch(err => console.error("Failed to generate thread name:", err));
    }
  }, [isPending, thread?.id, thread?.name, thread?.messages?.length, client, threadListQuery]);
  
  // Extract threads data from the query result
  // ThreadsOffsetAndLimit has an 'items' property containing the Thread array
  // Handle the React Query result - check if data exists and has items
  const threads = (threadListQuery.isSuccess && threadListQuery.data?.items) ? threadListQuery.data.items : [];
  
  // Thread deletion - using the Tambo client
  const deleteThread = async (threadId: string) => {
    try {
        await client.threads.delete(threadId);
        await threadListQuery.refetch();
        
        if (thread?.id === threadId) {
             // If we just deleted the active thread, create a new one or switch
             startNewThread();
        }
    } catch (error) {
        console.error("Failed to delete thread:", error);
    }
  };

  const deleteAllThreads = async () => {
    try {
        if (!threads || threads.length === 0) {
             return;
        }
        
        // Delete all in parallel using allSettled to ensure we try everything
        const results = await Promise.allSettled(threads.map((t: any) => client.threads.delete(t.id)));
        
        const failed = results.filter(r => r.status === 'rejected');
        if (failed.length > 0) {
            console.error(`Failed to delete ${failed.length} threads`, failed);
        } else {
            console.log("All threads deleted successfully.");
        }
        
        // Force refetch to update UI
        await threadListQuery.refetch();
        
        // Start a fresh thread since we wiped everything
        startNewThread();
    } catch (error) {
        console.error("Critical error in deleteAllThreads:", error);
    }
  };
  
  // Thread creation - use the startNewThread from useTamboThread
  const createThread = async () => {
    startNewThread();
  };
  
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isHistoryOpen, setHistoryOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [viewportSize, setViewportSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Handle export project as a zip file
  const handleExport = async () => {
    // We defer the actual code generation and zipping to a dynamic utility if needed,
    // but here we can just trigger a custom event or use a ref. 
    // To keep it simple, we'll use a custom event that Canvas listens for or move the logic to a shared utility.
    const event = new CustomEvent('intent-ui-export');
    window.dispatchEvent(event);
  };

  // Group components by name to only show the LATEST version (The "Living Canvas")
  const canvasItems = useMemo(() => {
    if (!thread || !thread.messages) return [];
    const registryMap: Record<string, CanvasItem & { props?: any }> = {};
    thread.messages.forEach((m: any) => {
      const name = m.component?.componentName;
      if (m.renderedComponent && name) {
        registryMap[name] = {
          id: m.id,
          component: m.renderedComponent,
          name: name,
          props: m.component?.props
        };
      }
    });
    return Object.values(registryMap);
  }, [thread]);

  // Messages for the chat sidebar (exclude messages that only contain tool results)
  const chatHistory = useMemo(() => {
    if (!thread || !thread.messages) return [];
    return thread.messages.filter((m: any) => {
      const text = m.content?.find((c: any) => c.type === 'text')?.text;
      return text && text.trim() !== "";
    });
  }, [thread]);


  return (
    <div className="flex h-screen w-full bg-black overflow-hidden selection:bg-white selection:text-black antialiased">
      {/* Sidebar for History */}
      <HistorySidebar 
        isOpen={isHistoryOpen} 
        onClose={() => setHistoryOpen(false)}
        threads={threads} 
        activeThreadId={thread?.id}
        onSelectThread={switchCurrentThread}
        onDeleteThread={deleteThread}
        onDeleteAllThreads={deleteAllThreads}
        onCreateThread={createThread}
      />
      
      <div className="flex-1 flex flex-col min-w-0 relative">
        <Header 
          isHistoryOpen={isHistoryOpen}
          setHistoryOpen={setHistoryOpen}
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isPending={isPending}
          onBack={onBackToLanding}
          viewMode={viewMode}
          setViewMode={setViewMode}
          viewportSize={viewportSize}
          setViewportSize={setViewportSize}
          handleExport={handleExport}
          canvasItems={canvasItems}
        />
        
        {/* Canvas Area */}
        <Canvas 
          thread={thread}
          canvasItems={canvasItems}
          viewMode={viewMode}
          isStreaming={isPending}
          viewportSize={viewportSize}
        />
      </div>

      {/* Controller Sidebar */}
      <ChatSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        thread={thread}
        chatHistory={chatHistory}
        value={value}
        setValue={setValue}
        onSubmit={submit}
        isPending={isPending}
      />

      {!isSidebarOpen && (
        <button 
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-6 right-6 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-50 animate-in fade-in zoom-in"
        >
          <Send size={18} />
        </button>
      )}
    </div>
  );
});

ChatInterface.displayName = 'ChatInterface';

export default ChatInterface;
