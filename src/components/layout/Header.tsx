import React from 'react';
import { History, ChevronLeft, Monitor, Code2, Download, Github, LogOut, Cloud } from 'lucide-react';
import { HeaderProps } from '../../types';
import { cn } from '../../lib/utils';
import { useGitHub } from '../../lib/github/context';

export const Header: React.FC<HeaderProps> = ({ 
  isHistoryOpen, 
  setHistoryOpen, 
  isSidebarOpen, 
  setSidebarOpen,
  onBack,
  viewMode,
  setViewMode,
  handleExport,
  canvasItems
}) => {
  const { isConnected, user, connect, disconnect } = useGitHub();

  return (
    <header className="h-20 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-zinc-950/50 backdrop-blur-2xl z-[40] relative noise">
      <div className="flex items-center gap-3 md:gap-6 min-w-0">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 md:gap-3 group px-2 md:px-4 py-2 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5 shrink-0"
        >
          <ChevronLeft size={18} className="text-zinc-500 group-hover:text-brand transition-colors" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-white transition-colors hidden sm:inline">Return</span>
        </button>
        
        <div className="h-6 w-px bg-white/10 hidden md:block" />
        
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          {!isHistoryOpen && (
            <button 
              onClick={() => setHistoryOpen(true)} 
              className="p-2 md:p-2.5 rounded-xl transition-all bg-white/[0.03] text-zinc-500 hover:text-brand hover:bg-brand/10 border border-white/5 hover:border-brand/20 brand-glow shrink-0"
              title="View History"
            >
              <History size={18} />
            </button>
          )}

          {/* Canvas Toolbar Integration */}
          {canvasItems.length > 0 && (
            <div className="flex items-center gap-1.5 md:gap-2 p-1 md:p-1.5 glass-card noise border-white/10 shadow-none animate-in fade-in duration-700 min-w-0">
              <div className="flex items-center gap-1 border-r border-white/10 pr-1.5 md:pr-2 mr-0.5 md:mr-1">
                <button 
                  onClick={() => setViewMode('preview')}
                  className={cn(
                    "flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                    viewMode === 'preview' ? "bg-brand text-white brand-glow" : "text-zinc-500 hover:text-white"
                  )}
                  title="Preview"
                >
                  <Monitor size={14} className="md:w-3 md:h-3" /> <span className="hidden xl:inline">Preview</span>
                </button>
                <button 
                  onClick={() => setViewMode('code')}
                  className={cn(
                    "flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                    viewMode === 'code' ? "bg-brand text-white brand-glow" : "text-zinc-500 hover:text-white"
                  )}
                  title="IDE"
                >
                  <Code2 size={14} className="md:w-3 md:h-3" /> <span className="hidden xl:inline">IDE</span>
                </button>
              </div>
              
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg bg-white text-black text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-none shrink-0"
                title="Export"
              >
                <Download size={14} className="md:w-3 md:h-3" /> <span className="hidden xl:inline">Export</span>
              </button>

              {isConnected && (
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('intent-ui-github-push'))}
                  className="flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg bg-brand text-white text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-none shrink-0 brand-glow"
                  title="Deploy to GitHub"
                >
                  <Cloud size={14} className="md:w-3 md:h-3" /> <span className="hidden xl:inline">Deploy</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6 shrink-0">
        {/* GitHub Connection */}
        <div className="flex items-center gap-2">
          {isConnected ? (
            <div className="flex items-center gap-3 p-1 pl-3 bg-white/5 border border-white/10 rounded-full hover:border-brand/30 transition-all group">
              <div className="flex flex-col items-end hidden md:flex">
                <span className="text-[9px] font-black text-white leading-none uppercase tracking-tighter">{user?.login}</span>
                <span className="text-[8px] text-zinc-500 leading-tight">Connected</span>
              </div>
              <img src={user?.avatar_url} alt={user?.login} className="w-8 h-8 rounded-full border border-white/20" />
              <button 
                onClick={disconnect}
                className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                title="Disconnect GitHub"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button 
              onClick={connect}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white hover:border-white/20 transition-all text-[10px] font-black uppercase tracking-widest"
            >
              <Github size={16} /> <span className="hidden sm:inline">Connect GitHub</span>
            </button>
          )}
        </div>

        {!isSidebarOpen && (
          <button 
            onClick={() => setSidebarOpen(true)} 
            className="p-2 md:p-2.5 rounded-xl transition-all bg-brand text-white hover:scale-105 active:scale-95 shadow-xl brand-glow border border-brand/20"
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {/* Decorative Bottom Shine */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent opacity-50" />
    </header>
  );
};