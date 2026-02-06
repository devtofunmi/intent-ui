import React, { useMemo, useState } from 'react';
import { cn } from '../../lib/utils';
import * as SandpackReact from "@codesandbox/sandpack-react";
import JSZip from 'jszip';
import { generateAppCode, generateComponentCode } from '../../lib/export-utils';
import { useGitHub } from '../../lib/github/context';
import { GithubPushModal } from '../modals/GithubPushModal';

export const Canvas = ({ thread, canvasItems, viewMode }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isGithubModalOpen, setGithubModalOpen] = useState(false);
  const { token } = useGitHub();
  const hasCodeFrame = canvasItems.some(i => i.name === 'CodeFrame');

  const appCode = useMemo(() => generateAppCode(canvasItems), [canvasItems]);
  
  const projectFiles = useMemo(() => {
    // ... logic remains same
    const files: Record<string, any> = {
      "/App.tsx": appCode,
      "/src/components/ui/wrappers.tsx": {
        code: `// Shadcn UI Wrapper Components\n// This file contains the registry implementation for your components.`,
        active: false
      },
      "/tailwind.config.js": {
        code: `/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  content: ["./src/**/*.{js,jsx,ts,tsx}"],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n};`,
        active: false
      },
      "/package.json": {
        code: JSON.stringify({
          name: "intent-ui-export",
          version: "1.0.0",
          dependencies: {
            "react": "^18.0.0",
            "react-dom": "^18.0.0",
            "lucide-react": "latest",
            "tailwindcss": "latest",
            "@tambo-ai/react": "latest"
          }
        }, null, 2),
        active: false
      }
    };

    canvasItems.forEach(item => {
      files[`/src/components/${item.name}.tsx`] = {
        code: generateComponentCode(item),
        active: false
      };
    });

    return files;
  }, [canvasItems, appCode]);

  const handleLocalExport = React.useCallback(async () => {
    if (isExporting) return;
    setIsExporting(true);
    
    try {
      const zip = new JSZip();
      Object.entries(projectFiles).forEach(([path, content]) => {
        const code = typeof content === 'string' ? content : content.code;
        zip.file(path.startsWith('/') ? path.slice(1) : path, code);
      });
      
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      
      // Dynamic naming based on thread name
      const safeName = thread?.name 
        ? thread.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') 
        : 'intent-ui-project';
      
      a.download = `${safeName}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      // Small timeout to ensure the user sees the state
      setTimeout(() => setIsExporting(false), 800);
    }
  }, [projectFiles, thread?.name, isExporting]);

  // Listen for export events from the Header
  React.useEffect(() => {
    window.addEventListener('intent-ui-export', handleLocalExport);
    const handleGithubPushEvent = () => setGithubModalOpen(true);
    window.addEventListener('intent-ui-github-push', handleGithubPushEvent);
    return () => {
      window.removeEventListener('intent-ui-export', handleLocalExport);
      window.removeEventListener('intent-ui-github-push', handleGithubPushEvent);
    };
  }, [handleLocalExport]);

  if (!thread) {
    return (
      <div className="flex-1 flex items-center justify-center bg-black/20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Initializing Canvas...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex-1 overflow-x-hidden relative scrollbar-hide flex flex-col",
      viewMode === 'preview' ? "overflow-y-auto" : "overflow-y-hidden"
    )}>
      {/* Fixed Immersive Layer */}
      <div className="fixed inset-0 pointer-events-none mesh-gradient noise z-0" />
      
      {/* Dynamic Environment Orbs (Fixed) */}
      <div className="fixed top-0 right-1/4 w-[800px] h-[800px] bg-brand/5 blur-[150px] rounded-full pointer-events-none opacity-30 animate-pulse z-0" />
      <div className="fixed bottom-0 left-1/4 w-[800px] h-[800px] bg-brand/3 blur-[150px] rounded-full pointer-events-none opacity-20 animate-pulse delay-1000 z-0" />


      <div className={cn(
        "w-full flex-1 flex flex-col relative z-20 min-h-0",
        hasCodeFrame || viewMode !== 'preview' ? "px-0 py-0 overflow-hidden" : "px-6 py-12 md:px-10 md:py-20"
      )}>
        {/* Export Loading Overlay */}
        {isExporting && (
          <div className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-300">
            <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 border-4 border-brand/20 border-t-brand rounded-full animate-spin" />
              <div className="flex flex-col items-center gap-2">
                <span className="text-xl font-black uppercase tracking-[0.4em] text-white animate-pulse">Packaging Project</span>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Generating source code & assets...</span>
              </div>
            </div>
          </div>
        )}
        {canvasItems.length === 0 ? (
          <div className="flex-1 min-h-[400px] flex flex-col items-center justify-center text-center space-y-12 animate-in fade-in duration-1000">
            {/* Empty state remains remains same... */}
            <div className="space-y-6 max-w-2xl mx-auto">
              <h2 className="text-5xl font-black text-white text-gradient">
                Living <br /> Interface
              </h2>
              <p className="text-xl text-zinc-500 font-medium  max-w-lg mx-auto">
                The canvas is primed. Use the neural controller to synthesize high-energy components.
              </p>
            </div>

            
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden h-full animate-in fade-in duration-500">
            {viewMode === 'preview' ? (
              <div className={cn(
                "grid grid-cols-1 md:grid-cols-12 items-start",
                hasCodeFrame ? "gap-0 h-full flex-1" : "gap-8 md:gap-12 pb-10"
              )}>
                {(hasCodeFrame 
                  ? canvasItems.filter(item => item.name === 'CodeFrame')
                  : canvasItems)
                  .sort((a, b) => {
                    const order = ['Hero', 'CodeFrame', 'Card', 'DataTable', 'Tabs', 'Accordion', 'Button', 'Input', 'Badge', 'Checkbox', 'Switch', 'Separator'];
                    const indexA = order.indexOf(a.name);
                    const indexB = order.indexOf(b.name);
                    
                    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                    if (indexA !== -1) return -1;
                    if (indexB !== -1) return 1;
                    return 0;
                  })
                  .map((item) => {
                  const isFullWidth = ['DataTable', 'Tabs', 'Accordion', 'CodeFrame', 'Hero'].includes(item.name);
                  const isMedium = ['Card'].includes(item.name);
                  const isSmall = ['Button', 'Input', 'Badge', 'Checkbox', 'Switch', 'Separator'].includes(item.name);
                  
                  let colSpan = 'md:col-span-4'; 
                  if (isFullWidth) colSpan = 'md:col-span-12';
                  if (isMedium) colSpan = 'md:col-span-6';
                  if (isSmall) colSpan = 'md:col-span-3';
                  
                  return (
                    <div 
                      key={item.id} 
                      id={item.name.toLowerCase()}
                      className={cn(
                        colSpan, 
                        "w-full transition-all duration-1000 animate-in fade-in slide-in-from-bottom-12 zoom-in-95",
                        hasCodeFrame && "h-full min-h-screen"
                      )}
                    >
                      <div className={cn("relative group/comp", hasCodeFrame && "h-full")}>
                        {!hasCodeFrame && <div className="absolute -inset-1 bg-brand/20 blur-xl opacity-0 group-hover/comp:opacity-100 transition-opacity duration-700 rounded-[2.5rem]" />}
                        <div className={cn("relative", hasCodeFrame && "h-full")}>
                          {item.component}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex-1 bg-[#151515] border-t border-white/5 flex flex-col relative h-full min-h-0">
                <style>{`
                  .sp-layout {
                    height: 100% !important;
                    border: 0 !important;
                    border-radius: 0 !important;
                    background: transparent !important;
                    display: flex !important;
                    flex-direction: row !important;
                    min-width: 0 !important;
                    width: 100% !important;
                    pointer-events: auto !important;
                  }

                  @media (max-width: 768px) {
                    .sp-layout {
                      flex-direction: column !important;
                    }
                    .sp-explorer {
                      height: 40% !important;
                      border-right: 0 !important;
                      border-bottom: 0 !important;
                    }
                  }

                  .sp-stack, .sp-wrapper, .sp-code-editor, .sp-editor, .sp-cm, .cm-editor {
                    flex: 1 !important;
                    height: 100% !important;
                    display: flex !important;
                    flex-direction: column !important;
                    min-height: 0 !important;
                    min-width: 0 !important;
                  }
                  .sp-explorer {
                    background: #151515 !important;
                    border-right: 1px solid rgba(255,255,255,0.05) !important;
                    height: 100% !important;
                    overflow-y: auto !important;
                  }
                  .cm-scroller {
                    overflow: auto !important;
                    flex: 1 !important;
                    height: 100% !important;
                    scrollbar-width: thin;
                    scrollbar-color: rgba(255,255,255,0.1) transparent;
                  }
                  .sp-tabs-container {
                    background: #151515 !important;
                    border-bottom: 1px solid rgba(255,255,255,0.05) !important;
                  }
                  .sp-tab-button {
                    font-size: 10px !important;
                    text-transform: uppercase !important;
                    letter-spacing: 0.1em !important;
                    font-weight: 900 !important;
                  }
                `}</style>
                <SandpackReact.SandpackProvider 
                  template="react-ts"
                  theme="dark"
                  files={projectFiles}
                >
                  <SandpackReact.SandpackLayout className="flex-1 border-0" style={{ height: '100%' }}>
                    <SandpackReact.SandpackFileExplorer />
                    <SandpackReact.SandpackCodeEditor 
                      className="flex-1" 
                      showLineNumbers={true}
                      showTabs={true}
                      closableTabs={true}
                      showInlineErrors={true}
                      wrapContent={true}
                    />
                  </SandpackReact.SandpackLayout>
                </SandpackReact.SandpackProvider>
              </div>
            )}
          </div>
        )}
      </div>
      <GithubPushModal 
        isOpen={isGithubModalOpen}
        onClose={() => setGithubModalOpen(false)}
        thread={thread}
        files={projectFiles}
        token={token || ''}
      />
    </div>
  );
};
