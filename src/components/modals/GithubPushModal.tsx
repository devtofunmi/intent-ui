import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Github, Lock, Globe, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { Octokit } from '@octokit/rest';
import { cn } from '../../lib/utils';
import { Thread } from '../../types';

interface GithubPushModalProps {
  isOpen: boolean;
  onClose: () => void;
  thread: Thread | null;
  files: Record<string, any>;
  token: string;
}

export const GithubPushModal: React.FC<GithubPushModalProps> = ({ 
  isOpen, 
  onClose, 
  thread, 
  files,
  token
}) => {
  const [repoName, setRepoName] = useState(thread?.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '');
  const [description, setDescription] = useState(`Project synthesized with Intent UI - ${thread?.name || ''}`);
  const [isPrivate, setIsPrivate] = useState(true);
  const [status, setStatus] = useState<'idle' | 'pushing' | 'success' | 'error'>('idle');
  const [repoUrl, setRepoUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePush = async () => {
    if (!token || status === 'pushing') return;
    
    setStatus('pushing');
    setErrorMessage('');
    
    try {
      const octokit = new Octokit({ auth: token });
      
      // 1. Create Repository
      // 1. Create Repository (auto_init: true is required to avoid "Repository is empty" error)
      const { data: repo } = await octokit.rest.repos.createForAuthenticatedUser({
        name: repoName,
        description,
        private: isPrivate,
        auto_init: true 
      });

      const owner = repo.owner.login;
      const name = repo.name;
      const defaultBranch = repo.default_branch;

      // 2. Get the initial commit (created by auto_init)
      const { data: ref } = await octokit.rest.git.getRef({
        owner,
        repo: name,
        ref: `heads/${defaultBranch}`,
      });
      const latestCommitSha = ref.object.sha;

      // 3. Prepare files for the "Atomic Commit"
      const fileEntries = Object.entries(files).map(([path, content]) => ({
        path: path.startsWith('/') ? path.slice(1) : path,
        mode: '100644' as const,
        type: 'blob' as const,
        content: typeof content === 'string' ? content : content.code
      }));

      // 4. Create Tree
      const { data: tree } = await octokit.rest.git.createTree({
        owner,
        repo: name,
        tree: fileEntries
      });

      // 5. Create Commit (linked to the initial commit)
      const { data: commit } = await octokit.rest.git.createCommit({
        owner,
        repo: name,
        message: '🚀 Synthesized with Intent UI',
        tree: tree.sha,
        parents: [latestCommitSha]
      });

      // 6. Update main branch
      await octokit.rest.git.updateRef({
        owner,
        repo: name,
        ref: `heads/${defaultBranch}`,
        sha: commit.sha
      });

      setRepoUrl(repo.html_url);
      setStatus('success');
    } catch (err: any) {
      console.error("GitHub Push Error:", err);
      setErrorMessage(err.message || 'Failed to push to GitHub');
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
                <Github size={20} className="text-white" />
              </div>
              <div>
                <Dialog.Title className="text-xl font-black uppercase tracking-widest text-white">Push to GitHub</Dialog.Title>
                <Dialog.Description className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none">Create a new repository & deploy code</Dialog.Description>
              </div>
            </div>
            <Dialog.Close className="p-2 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-colors">
              <X size={20} />
            </Dialog.Close>
          </div>

          {status === 'idle' || status === 'pushing' || status === 'error' ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Repository Name</label>
                <input 
                  type="text"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand/50 transition-all font-medium placeholder:text-zinc-700"
                  placeholder="my-awesome-project"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Description (Optional)</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand/50 transition-all font-medium resize-none h-24 placeholder:text-zinc-700"
                />
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setIsPrivate(true)}
                  className={cn(
                    "flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all",
                    isPrivate ? "bg-brand/10 border-brand/50" : "bg-white/5 border-white/10 grayscale opacity-50 hover:opacity-100 hover:grayscale-0"
                  )}
                >
                  <Lock size={18} className={isPrivate ? "text-brand" : "text-zinc-500"} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Private</span>
                </button>
                <button 
                  onClick={() => setIsPrivate(false)}
                  className={cn(
                    "flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all",
                    !isPrivate ? "bg-blue-500/10 border-blue-500/50" : "bg-white/5 border-white/10 grayscale opacity-50 hover:opacity-100 hover:grayscale-0"
                  )}
                >
                  <Globe size={18} className={!isPrivate ? "text-blue-500" : "text-zinc-500"} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Public</span>
                </button>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-[10px] text-red-400 font-bold uppercase tracking-tight">
                  Error: {errorMessage}
                </div>
              )}

              <button 
                onClick={handlePush}
                disabled={status === 'pushing' || !repoName}
                className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 shadow-xl"
              >
                {status === 'pushing' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Deploying to GitHub...</span>
                  </>
                ) : (
                  <>
                    <Github size={16} />
                    <span>Create & Push Repository</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="py-8 flex flex-col items-center text-center animate-in zoom-in-95 fade-in duration-500">
              <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={40} className="text-green-500" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-widest text-white mb-2">Success!</h3>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-8">Your project is now live on GitHub</p>
              
              <a 
                href={repoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 bg-brand text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl brand-glow"
              >
                <span>View Repository</span>
                <ArrowRight size={16} />
              </a>
              
              <button 
                onClick={onClose}
                className="mt-4 text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
              >
                Close Modal
              </button>
            </div>
          )}

        </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
