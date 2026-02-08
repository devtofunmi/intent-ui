import { useRef, useEffect } from 'react';
import { ArrowRight, ChevronRight, Mic, Square } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTamboVoice } from '@tambo-ai/react';
import { motion } from 'framer-motion';

import { ChatSidebarProps } from '../../types';

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ 
  isOpen, 
  onClose,
  thread, 
  chatHistory, 
  value, 
  setValue, 
  onSubmit, 
  isPending
}) => {
  const messagesEndRef = useRef(null);
  const { 
    startRecording, 
    stopRecording, 
    isRecording, 
    transcript, 
    isTranscribing 
  } = useTamboVoice();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  // Handle voice transcript
  useEffect(() => {
    if (transcript && !isRecording && !isTranscribing) {
      setValue(transcript);
      // Optional: Auto-submit on voice stop
      setTimeout(() => onSubmit(), 100);
    }
  }, [transcript, isRecording, isTranscribing]);

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit();
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <motion.div 
      initial={false}
      animate={{ 
        width: isOpen ? (window.innerWidth < 768 ? '100%' : 450) : 0,
        opacity: isOpen ? 1 : 0
      }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "bg-zinc-950/80 backdrop-blur-3xl border-l border-white/5 flex flex-col z-[45] noise relative shrink-0 overflow-hidden"
      )}
    >
      {/* Neural Background Ambience */}
      <div className="absolute bottom-0 right-0 w-full h-1/2 bg-brand/5 blur-[100px] rounded-full pointer-events-none opacity-30" />
      
      <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-4">
          <button 
            id="chat-sidebar-btn-close"
            onClick={onClose}
            className="p-2 -ml-2 hover:bg-white/5 rounded-xl text-zinc-500 hover:text-white transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10 scrollbar-hide relative z-10">
        {!thread ? (
          <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-20">
             <div className="w-10 h-10 border-2 border-brand border-t-transparent rounded-full animate-spin brand-glow" />
             <span className="text-[10px] font-black uppercase tracking-widest text-brand">Syncing...</span>
          </div>
        ) : chatHistory.map((message) => {
          const text = message.content?.find(c => c.type === 'text')?.text;
          const isUser = message.role === 'user';
          return (
            <div key={message.id} className={`flex flex-col ${isUser ? 'items-end text-right' : 'items-start text-left'} group animate-in fade-in slide-in-from-bottom-4 duration-500`}>
              <div className={cn(
                "max-w-[85%] rounded-[2rem] p-6 text-[14px] leading-relaxed transition-all relative noise overflow-hidden",
                isUser 
                  ? 'bg-brand text-white rounded-tr-none shadow-none' 
                  : 'glass-card text-zinc-300 rounded-tl-none premium-border shadow-none'
              )}>
                {isUser && <div className="absolute inset-0 bg-white/10 opacity-20 group-hover:opacity-30 transition-opacity" />}
                <p className="relative z-10 font-medium">
                  {text?.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((part, i) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return <strong key={i} className="font-black text-white">{part.slice(2, -2)}</strong>;
                    }
                    if (part.startsWith('*') && part.endsWith('*')) {
                      return <em key={i} className="italic text-zinc-400 font-bold">{part.slice(1, -1)}</em>;
                    }
                    return part;
                  })}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em]">
                  {isUser ? 'Neural Commander' : 'Core System'}
                </span>
                <div className="w-1 h-1 rounded-full bg-zinc-800" />
                <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">
                  {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}
        {isPending && (
          <div className="flex flex-col items-start group animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass-card text-zinc-300 rounded-[2rem] rounded-tl-none p-6 premium-border noise overflow-hidden relative shadow-none">
              <div className="flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-brand animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-brand animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-brand animate-bounce" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 md:p-8 bg-zinc-950/50 backdrop-blur-xl border-t border-white/5 relative z-20">

        <div className="relative group">
          <div className="absolute -inset-1 bg-brand/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000" />
          
          {/* Voice Status Overlay */}
          {(isRecording || isTranscribing) && (
            <div className="absolute inset-x-0 -top-12 flex items-center justify-center animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-3 px-4 py-2 bg-brand rounded-full brand-glow shadow-2xl">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-white" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white">
                  {isRecording ? 'Listening for Init...' : 'Processing Neural Waves...'}
                </span>
              </div>
            </div>
          )}

          <input
            id="chat-sidebar-instruction-input"
            type="text"
            value={isRecording ? 'Listening...' : value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Neural instruction..."
            disabled={isRecording || isTranscribing}
            className="w-full bg-zinc-950/80 border border-white/10 rounded-2xl px-6 py-5 pr-28 text-white text-sm font-bold placeholder:text-zinc-700 outline-none focus:border-brand/50 transition-all shadow-none relative z-10 noise disabled:opacity-50"
          />
          
          <div className="absolute right-3 top-3 bottom-3 flex items-center gap-2 z-20">
            <button 
              id="chat-sidebar-btn-voice"
              onClick={toggleRecording}
              disabled={isPending || isTranscribing}
              className={cn(
                "h-full aspect-square rounded-[1.2rem] flex items-center justify-center transition-all shadow-none border z-20 disabled:opacity-50 disabled:grayscale",
                isRecording 
                  ? "bg-red-500/20 border-red-500/50 text-red-500 animate-pulse" 
                  : "bg-white/5 border-white/10 text-zinc-500 hover:text-white hover:border-white/20"
              )}
              title={isRecording ? "Stop Recording" : "Voice Command"}
            >
              {isRecording ? <Square size={16} fill="currentColor" /> : <Mic size={18} />}
            </button>

            <button 
              id="chat-sidebar-btn-submit"
              onClick={handleSubmit}
              disabled={isPending || !thread || isRecording || isTranscribing}
              className="h-full aspect-square bg-brand text-white rounded-[1.2rem] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-none brand-glow border border-brand/20 z-20 disabled:opacity-50 disabled:grayscale"
            >
              {isPending || isTranscribing ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <ArrowRight size={20} />
              )}
            </button>
          </div>
        </div>
        
        <p className="mt-4 text-center text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em]">
           Neural Interface Session Active
        </p>
      </div>

      {/* Left Border Shine */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand/30 to-transparent" />
    </motion.div>
  );
};