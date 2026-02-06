import React from 'react';
import { Plus, Trash2, History, ChevronLeft } from 'lucide-react';
import { cn } from '../../lib/utils';

export const HistorySidebar = ({ 
  isOpen, 
  onClose,
  threads, 
  activeThreadId, 
  onSelectThread, 
  onDeleteThread, 
  onCreateThread, 
  onDeleteAllThreads
}: {
  isOpen: boolean;
  onClose: () => void;
  threads: any[];
  activeThreadId?: string;
  onSelectThread: (id: string) => void;
  onDeleteThread: (id: string) => void;
  onCreateThread: () => Promise<any>;
  onDeleteAllThreads: () => void;
}) => {
  const [deletingThreadId, setDeletingThreadId] = React.useState<string | null>(null);
  const [isDeletingAll, setIsDeletingAll] = React.useState(false);

  const handleNewThread = async () => {
    try {
      await onCreateThread();
      onClose();
    } catch (error) {
      console.error("Failed to create thread:", error);
    }
  };

  const confirmDeleteThread = () => {
    if (deletingThreadId) {
        onDeleteThread(deletingThreadId);
        setDeletingThreadId(null);
    }
  };

  const confirmDeleteAll = () => {
      onDeleteAllThreads();
      setIsDeletingAll(false);
  };

  return (
    <>
      <div className={cn(
        "bg-zinc-950/80 backdrop-blur-3xl border-r border-white/5 flex flex-col transition-[width] duration-500 ease-in-out z-50 noise relative shrink-0",
        isOpen ? "w-full md:w-80" : "w-0 overflow-hidden"
      )}>
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-brand/5 blur-[100px] rounded-full pointer-events-none opacity-30" />
        
        <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={onClose}
              className="p-2 -ml-2 hover:bg-white/5 rounded-xl text-zinc-500 hover:text-white transition-all lg:hidden"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex flex-col">
              <span className="text-sm font-black text-white tracking-widest uppercase">History</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {threads && threads.length > 0 && (
                 <button 
                   onClick={() => setIsDeletingAll(true)}
                   className="w-10 h-10 bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 rounded-xl flex items-center justify-center transition-all shadow-none"
                   title="Clear All History"
                 >
                   <Trash2 size={18} />
                 </button>
            )}
            <button onClick={handleNewThread} className="w-10 h-10 bg-brand text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-none brand-glow border border-brand/20">
              <Plus size={20} />
            </button>
            <button 
              onClick={onClose}
              className="p-2.5 hover:bg-white/5 rounded-xl text-zinc-500 hover:text-white transition-all hidden lg:block border border-transparent hover:border-white/10"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 relative z-10 scrollbar-hide">
          {!threads || threads.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-zinc-900 border border-white/5 flex items-center justify-center shadow-none relative noise overflow-hidden">
                 <div className="absolute inset-0 bg-brand/10 blur-xl rounded-full animate-pulse" />
                <History size={24} className="text-zinc-600 relative z-10" />
              </div>
              <p className="text-xs text-zinc-600 font-black uppercase tracking-[0.2em]">No Active Sessions</p>
            </div>
          ) : (
            threads.map((t) => (
              <div key={t.id} className={cn(
                "group relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 border glass-card noise overflow-hidden shadow-none",
                activeThreadId === t.id 
                  ? "border-brand/30 bg-brand/[0.03]" 
                  : "border-white/[0.03] bg-transparent hover:bg-white/[0.02] hover:border-white/10"
              )}>
                 {/* Selection Indicator */}
                <div className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full transition-all duration-500",
                  activeThreadId === t.id ? "bg-brand" : "bg-transparent"
                )} />

                <button 
                  onClick={() => {
                    onSelectThread(t.id);
                    onClose();
                  }} 
                  className="flex-1 text-left flex flex-col gap-1 min-w-0"
                >
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-[0.2em] transition-colors",
                    activeThreadId === t.id ? "text-brand" : "text-zinc-600"
                  )}>
                    Interface
                  </span>
                  <span className={cn(
                    "text-xs font-black tracking-widest truncate transition-colors",
                    activeThreadId === t.id ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                  )}>
                    {t.name || t.id?.slice(-8).toUpperCase() || "New interface"}
                  </span>
                </button>
                
                <button 
                  onClick={() => setDeletingThreadId(t.id)} 
                  className="opacity-0 group-hover:opacity-100 p-2 hover:bg-brand text-zinc-500 hover:text-white rounded-xl transition-all duration-300 shadow-none"
                  title="Deconstruct Session"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Extreme Right Border Shine */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>

       {/* Delete Confirmation Modal */}
       {(deletingThreadId || isDeletingAll) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-6 animate-in fade-in zoom-in-95">
          <div className="w-full max-w-md bg-zinc-900 border border-white/10 p-6 rounded-3xl shadow-none relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-brand" />
             <h3 className="text-xl font-bold text-white mb-2">Confirm Deletion</h3>
             <p className="text-zinc-400 mb-6">
                {isDeletingAll 
                    ? "Are you sure you want to delete all history? This action cannot be undone." 
                    : "Are you sure you want to delete this session? This action cannot be undone."}
             </p>
             <div className="flex justify-end gap-3">
               <button 
                 onClick={() => { setDeletingThreadId(null); setIsDeletingAll(false); }}
                 className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
               >
                 Cancel
               </button>
               <button 
                 onClick={isDeletingAll ? confirmDeleteAll : confirmDeleteThread}
                 className="px-4 py-2 rounded-xl bg-brand text-white hover:opacity-90 transition-opacity text-sm font-bold shadow-none brand-glow"
               >
                 Confirm Delete
               </button>
             </div>
          </div>
        </div>
      )}
    </>
  );
};