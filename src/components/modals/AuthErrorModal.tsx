import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, AlertTriangle, ExternalLink, ArrowRight } from 'lucide-react';

interface AuthErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  error: string;
  isDev?: boolean;
}

export const AuthErrorModal: React.FC<AuthErrorModalProps> = ({ 
  isOpen, 
  onClose, 
  error,
  isDev = false
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] animate-in fade-in duration-300" />
        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
          <Dialog.Content className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-zinc-900 border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl animate-in zoom-in-95 fade-in duration-300 noise pointer-events-auto">
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-500/10 rounded-xl border border-red-500/30">
                <AlertTriangle size={20} className="text-red-500" />
              </div>
              <div>
                <Dialog.Title className="text-xl font-black uppercase tracking-widest text-white">
                  Authentication Failed
                </Dialog.Title>
                <Dialog.Description className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none">
                  {isDev ? 'Development Mode Issue' : 'OAuth Error'}
                </Dialog.Description>
              </div>
            </div>
            <Dialog.Close className="p-2 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-colors">
              <X size={20} />
            </Dialog.Close>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl">
              <p className="text-sm text-red-200 leading-relaxed">
                {error}
              </p>
            </div>

            {isDev && (
              <div className="space-y-4">
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
                  <p className="text-xs text-amber-200 leading-relaxed mb-3">
                    <span className="font-bold">Development Mode:</span> The OAuth callback requires a serverless function that's only available in production.
                  </p>
                  <p className="text-xs text-amber-300/80 leading-relaxed">
                    For local development, please use a Personal Access Token instead.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">How to use PAT:</p>
                  <ol className="space-y-2 text-xs text-zinc-400 leading-relaxed">
                    <li className="flex gap-2">
                      <span className="text-brand font-bold">1.</span>
                      <span>Generate a token at GitHub Settings</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand font-bold">2.</span>
                      <span>Select scopes: <code className="text-[10px] bg-black/50 px-1.5 py-0.5 rounded">repo</code> and <code className="text-[10px] bg-black/50 px-1.5 py-0.5 rounded">user</code></span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand font-bold">3.</span>
                      <span>Click "Connect GitHub" and paste your token</span>
                    </li>
                  </ol>
                </div>

                <a 
                  href="https://github.com/settings/tokens/new?scopes=repo,user&description=Intent%20UI%20Local%20Development"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-brand/10 border border-brand/30 text-brand rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-brand/20 transition-all"
                >
                  <ExternalLink size={14} />
                  <span>Generate Token on GitHub</span>
                </a>
              </div>
            )}

            <button 
              onClick={onClose}
              className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl"
            >
              <span>Go Back</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
