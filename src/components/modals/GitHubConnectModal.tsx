import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Github, Key, AlertTriangle, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';

interface GitHubConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectWithPAT: (token: string) => void;
  onConnectWithOAuth: () => void;
  mode: 'no-client-id' | 'dev-mode' | null;
}

export const GitHubConnectModal: React.FC<GitHubConnectModalProps> = ({ 
  isOpen, 
  onClose, 
  onConnectWithPAT,
  onConnectWithOAuth,
  mode
}) => {
  const [token, setToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(false);

  const handleSubmit = () => {
    if (token.trim()) {
      onConnectWithPAT(token.trim());
      setToken('');
      setShowTokenInput(false);
    }
  };

  const handleOAuthClick = () => {
    onConnectWithOAuth();
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] animate-in fade-in duration-300" />
        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
          <Dialog.Content className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-zinc-900 border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl animate-in zoom-in-95 fade-in duration-300 noise pointer-events-auto">
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
                <Github size={20} className="text-white" />
              </div>
              <div>
                <Dialog.Title className="text-xl font-black uppercase tracking-widest text-white">
                  Connect GitHub
                </Dialog.Title>
                <Dialog.Description className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none">
                  {mode === 'no-client-id' ? 'OAuth Not Configured' : 'Development Mode'}
                </Dialog.Description>
              </div>
            </div>
            <Dialog.Close className="p-2 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-colors">
              <X size={20} />
            </Dialog.Close>
          </div>

          {mode === 'no-client-id' ? (
            // No Client ID configured
            <div className="space-y-6">
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex gap-3">
                <AlertTriangle size={20} className="text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-amber-200">OAuth Not Configured</p>
                  <p className="text-xs text-amber-300/80 leading-relaxed">
                    VITE_GITHUB_CLIENT_ID is not set in your environment variables. 
                    You can use a Personal Access Token to connect instead.
                  </p>
                </div>
              </div>

              {!showTokenInput ? (
                <button 
                  onClick={() => setShowTokenInput(true)}
                  className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl"
                >
                  <Key size={16} />
                  <span>Use Personal Access Token</span>
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">
                      GitHub Personal Access Token
                    </label>
                    <input 
                      type="password"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand/50 transition-all font-mono placeholder:text-zinc-700"
                      placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                      autoFocus
                    />
                  </div>

                  <a 
                    href="https://github.com/settings/tokens/new?scopes=repo,user&description=Intent%20UI%20Local%20Development"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[10px] text-brand hover:text-brand/80 transition-colors font-bold uppercase tracking-widest"
                  >
                    <ExternalLink size={12} />
                    <span>Generate Token on GitHub</span>
                  </a>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowTokenInput(false)}
                      className="flex-1 py-3 bg-white/5 border border-white/10 text-zinc-400 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSubmit}
                      disabled={!token.trim()}
                      className="flex-1 py-3 bg-brand text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 brand-glow"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-white/5">
                <p className="text-[9px] text-zinc-600 leading-relaxed">
                  <span className="font-bold text-zinc-500">Required Scopes:</span> repo, user
                  <br />
                  Your token is stored locally and never sent to our servers.
                </p>
              </div>
            </div>
          ) : (
            // Development Mode
            <div className="space-y-6">
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex gap-3">
                <AlertTriangle size={20} className="text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-amber-200">Development Mode Detected</p>
                  <p className="text-xs text-amber-300/80 leading-relaxed">
                    OAuth flow requires a deployed serverless function. For local development, 
                    we recommend using a Personal Access Token.
                  </p>
                </div>
              </div>

              <div className="grid gap-3">
                <button 
                  onClick={() => setShowTokenInput(true)}
                  className={cn(
                    "p-5 rounded-2xl border-2 transition-all text-left group hover:scale-[1.02]",
                    showTokenInput 
                      ? "bg-brand/10 border-brand/50" 
                      : "bg-white/5 border-white/10 hover:border-brand/30"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-brand/10 rounded-lg border border-brand/20 group-hover:bg-brand/20 transition-colors">
                      <Key size={18} className="text-brand" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-black uppercase tracking-wider text-white mb-1">
                        Personal Access Token
                      </h3>
                      <p className="text-[10px] text-zinc-500 leading-relaxed">
                        Recommended for local development. Quick and secure.
                      </p>
                    </div>
                  </div>
                </button>

                <button 
                  onClick={handleOAuthClick}
                  className="p-5 rounded-2xl border-2 bg-white/5 border-white/10 hover:border-white/20 transition-all text-left group hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:bg-white/10 transition-colors">
                      <Github size={18} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-black uppercase tracking-wider text-white mb-1">
                        Try OAuth Anyway
                      </h3>
                      <p className="text-[10px] text-zinc-500 leading-relaxed">
                        Will redirect to GitHub but fail on callback in development.
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              {showTokenInput && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">
                      GitHub Personal Access Token
                    </label>
                    <input 
                      type="password"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand/50 transition-all font-mono placeholder:text-zinc-700"
                      placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                      autoFocus
                    />
                  </div>

                  <a 
                    href="https://github.com/settings/tokens/new?scopes=repo,user&description=Intent%20UI%20Local%20Development"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[10px] text-brand hover:text-brand/80 transition-colors font-bold uppercase tracking-widest"
                  >
                    <ExternalLink size={12} />
                    <span>Generate Token on GitHub</span>
                  </a>

                  <button 
                    onClick={handleSubmit}
                    disabled={!token.trim()}
                    className="w-full py-4 bg-brand text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 shadow-xl brand-glow"
                  >
                    <Key size={16} />
                    <span>Connect with Token</span>
                  </button>
                </div>
              )}

              <div className="pt-4 border-t border-white/5">
                <p className="text-[9px] text-zinc-600 leading-relaxed">
                  <span className="font-bold text-zinc-500">Note:</span> Full OAuth flow works in production with deployed serverless functions.
                </p>
              </div>
            </div>
          )}

        </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
