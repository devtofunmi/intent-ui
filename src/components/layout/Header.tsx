import { History, ChevronLeft, Monitor, Code2, Download, Github, LogOut, Cloud, Laptop, Tablet, Smartphone } from 'lucide-react';
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
  viewportSize,
  setViewportSize,
  handleExport,
  canvasItems,
  isPending
}) => {
  const { isConnected, user, connect, disconnect } = useGitHub();

  return (
    <header className="h-20 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-zinc-950/50 backdrop-blur-2xl z-[40] relative noise">
      <div className="flex items-center gap-3 md:gap-6 min-w-0">
        <button 
          id="header-btn-back"
          onClick={onBack}
          className="flex items-center gap-2 md:gap-3 group px-2 md:px-4 py-2 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5 shrink-0"
        >
          <ChevronLeft size={18} className="text-zinc-500 group-hover:text-brand transition-colors" />
          <span className={cn("text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-white transition-colors hidden sm:inline", isSidebarOpen && "!hidden")}>Return</span>
        </button>
        
        <div className="h-6 w-px bg-white/10 hidden md:block" />
        
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          {!isHistoryOpen && (
            <button 
              id="header-btn-history"
              onClick={() => setHistoryOpen(true)} 
              className="p-2 md:p-2.5 rounded-xl transition-all bg-white/[0.03] text-zinc-500 hover:text-brand hover:bg-brand/10 border border-white/5 hover:border-brand/20 brand-glow shrink-0"
              title="View History"
            >
              <History size={18} />
            </button>
          )}

          {/* Canvas Toolbar Integration */}
          {canvasItems.length > 0 && (
            <div className="flex items-center rounded-md gap-1.5 md:gap-2 p-1 md:p-1.5 glass-card noise border-white/10 shadow-none animate-in fade-in duration-700 min-w-0">
              <div className="flex items-center gap-1 border-r border-white/10 pr-1.5 md:pr-2 mr-0.5 md:mr-1">
                <button 
                  id="header-btn-preview-mode"
                  onClick={() => setViewMode('preview')}
                  disabled={isPending}
                  className={cn(
                    "flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                    viewMode === 'preview' ? "bg-brand text-white brand-glow" : "text-zinc-500 hover:text-white"
                  )}
                  title="Preview"
                >
                  <Monitor size={14} className="md:w-3 md:h-3" /> <span className="hidden xl:inline">Preview</span>
                </button>
                <button 
                  id="header-btn-code-mode"
                  onClick={() => setViewMode('code')}
                  disabled={isPending}
                  className={cn(
                    "flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                    viewMode === 'code' ? "bg-brand text-white brand-glow" : "text-zinc-500 hover:text-white"
                  )}
                  title="Editor"
                >
                  <Code2 size={14} className="md:w-3 md:h-3" /> <span className="hidden xl:inline">Editor</span>
                </button>
              </div>

              {/* Viewport Toggles */}
              {viewMode === 'preview' && (
                <div className="hidden md:flex items-center gap-1 border-r border-white/10 pr-1.5 md:pr-2 mr-0.5 md:mr-1">
                  <button 
                    id="header-btn-viewport-desktop"
                    onClick={() => setViewportSize('desktop')}
                    className={cn(
                      "p-1.5 rounded-md transition-all",
                      viewportSize === 'desktop' ? "bg-white/10 text-white" : "text-zinc-500 hover:text-white"
                    )}
                    title="Desktop"
                  >
                    <Laptop size={14} />
                  </button>
                  <button 
                    id="header-btn-viewport-tablet"
                    onClick={() => setViewportSize('tablet')}
                    className={cn(
                      "p-1.5 rounded-md transition-all",
                      viewportSize === 'tablet' ? "bg-white/10 text-white" : "text-zinc-500 hover:text-white"
                    )}
                    title="Tablet"
                  >
                    <Tablet size={14} />
                  </button>
                  <button 
                    id="header-btn-viewport-mobile"
                    onClick={() => setViewportSize('mobile')}
                    className={cn(
                      "p-1.5 rounded-md transition-all",
                      viewportSize === 'mobile' ? "bg-white/10 text-white" : "text-zinc-500 hover:text-white"
                    )}
                    title="Mobile"
                  >
                    <Smartphone size={14} />
                  </button>
                </div>
              )}
              
              <button 
                id="header-btn-export-zip"
                onClick={handleExport}
                disabled={isPending}
                className="flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg bg-white text-black text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-none shrink-0 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                title="Export"
              >
                <Download size={14} className="md:w-3 md:h-3" /> <span className={cn("hidden xl:inline", isSidebarOpen && "!hidden")}>Export</span>
              </button>

              {isConnected && (
                <button 
                  id="header-btn-github-push"
                  onClick={() => window.dispatchEvent(new CustomEvent('init-ui-github-push'))}
                  disabled={isPending}
                  className="flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg bg-brand text-white text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-none shrink-0 brand-glow disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                  title="Export to GitHub"
                >
                  <Cloud size={14} className="md:w-3 md:h-3" /> <span className={cn("hidden xl:inline", isSidebarOpen && "!hidden")}>Export to GitHub</span>
                </button>
              )}

              <button 
                id="header-btn-vercel-deploy"
                onClick={() => window.dispatchEvent(new CustomEvent('init-ui-vercel-deploy'))}
                disabled={isPending}
                className="flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg bg-white text-black text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-none shrink-0 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                title="Deploy to Vercel"
              >
                <svg width="12" height="12" viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-3 md:h-3">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor"/>
                </svg>
                <span className={cn("hidden xl:inline", isSidebarOpen && "!hidden")}>Deploy to Vercel</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6 shrink-0">
        {/* GitHub Connection */}
        <div className="flex items-center gap-2">
          {isConnected ? (
            <div className="flex items-center gap-3 p-1 pl-3 bg-white/5 border border-white/10 rounded-full hover:border-brand/30 transition-all group">
              <div className={cn("flex flex-col items-end hidden md:flex", isSidebarOpen && "!hidden")}>
                <span className="text-[9px] font-black text-white leading-none uppercase tracking-tighter">{user?.login}</span>
                <span className="text-[8px] text-zinc-500 leading-tight">Connected</span>
              </div>
              <img src={user?.avatar_url} alt={user?.login} className="w-8 h-8 rounded-full border border-white/20" />
              <button 
                id="header-btn-github-disconnect"
                onClick={disconnect}
                disabled={isPending}
                className="p-2 text-zinc-500 hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Disconnect GitHub"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button 
              id="header-btn-github-connect"
              onClick={connect}
              disabled={isPending}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white hover:border-white/20 transition-all text-[10px] font-black uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Github size={16} /> <span className={cn("hidden sm:inline", isSidebarOpen && "!hidden")}>Connect GitHub</span>
            </button>
          )}
        </div>

        {!isSidebarOpen && (
          <button 
            id="header-btn-toggle-sidebar"
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