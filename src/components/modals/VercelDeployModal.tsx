import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Globe, Loader2, CheckCircle2, ArrowRight, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Thread } from '../../types';

interface VercelDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  thread: Thread | null;
  files: Record<string, any>;
}

export const VercelDeployModal: React.FC<VercelDeployModalProps> = ({ 
  isOpen, 
  onClose, 
  thread, 
  files
}) => {
  const [token, setToken] = useState(localStorage.getItem('vercel_token') || '');
  const [status, setStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');
  const [deployUrl, setDeployUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfig, setShowConfig] = useState(!localStorage.getItem('vercel_token'));

  const handleDeploy = async () => {
    if (!token.trim() || status === 'deploying') return;
    
    // Save token for next time
    localStorage.setItem('vercel_token', token.trim());
    setStatus('deploying');
    setErrorMessage('');
    
    try {
      // Prepare files for Vercel API format
      // Vercel expects an array of { file: path, data: content }
      const vercelFiles = Object.entries(files).map(([path, content]) => ({
        file: path.startsWith('/') ? path.slice(1) : path,
        data: typeof content === 'string' ? content : content.code
      }));

      const projectName = thread?.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'intent-ui-project';

      const response = await fetch('https://api.vercel.com/v13/deployments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.trim()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: projectName,
          files: vercelFiles,
          projectSettings: {
            framework: 'vite',
            buildCommand: 'npm run build',
            outputDirectory: 'dist',
          },
          target: 'production'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Deployment failed');
      }

      setDeployUrl(`https://${data.url}`);
      setStatus('success');
    } catch (err: any) {
      console.error("Vercel Deployment Error:", err);
      setErrorMessage(err.message || 'Failed to deploy to Vercel');
      setStatus('error');
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] animate-in fade-in duration-300" />
        <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
          <Dialog.Content className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-zinc-900 border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl animate-in zoom-in-95 fade-in duration-300 noise pointer-events-auto">
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
                  <svg width="20" height="20" viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="white"/>
                  </svg>
                </div>
                <div>
                  <Dialog.Title className="text-xl font-black uppercase tracking-widest text-white">Deploy to Vercel</Dialog.Title>
                  <Dialog.Description className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none">Instant Production Synthesis</Dialog.Description>
                </div>
              </div>
              <Dialog.Close className="p-2 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-colors">
                <X size={20} />
              </Dialog.Close>
            </div>

            {status === 'success' ? (
              <div className="py-8 flex flex-col items-center text-center animate-in zoom-in-95 fade-in duration-500">
                <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} className="text-green-500" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-widest text-white mb-2">Deployed!</h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-8">Your project is now live on Vercel Edge</p>
                
                <a 
                  href={deployUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-brand text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl brand-glow"
                >
                  <span>Open Production</span>
                  <ArrowRight size={16} />
                </a>
                
                <button 
                  onClick={onClose}
                  className="mt-4 text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                >
                  Close Modal
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {showConfig ? (
                  <div className="space-y-4 animate-in slide-in-from-top-2 duration-500">
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex gap-3">
                      <ShieldCheck size={20} className="text-blue-500 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-blue-200">Vercel API Token Required</p>
                        <p className="text-xs text-blue-300/80 leading-relaxed">
                          To deploy directly from Intent UI, you need a Vercel Access Token. 
                          It will be stored locally in your browser.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Access Token</label>
                      <input 
                        type="password"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand/50 transition-all font-mono placeholder:text-zinc-700"
                        placeholder="Paste your token here..."
                      />
                    </div>

                    <a 
                      href="https://vercel.com/account/tokens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[10px] text-brand hover:underline font-black uppercase tracking-widest"
                    >
                      <ExternalLink size={12} />
                      <span>Create Token in Vercel Dashboard</span>
                    </a>

                    <button 
                      onClick={() => setShowConfig(false)}
                      disabled={!token.trim()}
                      className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all"
                    >
                      Save Configuration
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand/20 rounded-lg flex items-center justify-center border border-brand/30">
                          <Zap size={16} className="text-brand" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-white">Project Connection</p>
                          <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Linked to Vercel API</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setShowConfig(true)}
                        className="text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                      >
                        Change Token
                      </button>
                    </div>

                    {errorMessage && (
                      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-[10px] text-red-400 font-bold uppercase tracking-tight">
                        Error: {errorMessage}
                      </div>
                    )}

                    <button 
                      onClick={handleDeploy}
                      disabled={status === 'deploying'}
                      className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 shadow-xl"
                    >
                      {status === 'deploying' ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Synthesizing Link...</span>
                        </>
                      ) : (
                        <>
                          <Globe size={16} />
                          <span>Deploy to Production</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
