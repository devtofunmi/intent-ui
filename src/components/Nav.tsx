import React from 'react';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Nav = ({ 
  logoText = "INTENT", 
  links = [],
  onLaunch
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleScroll = (e, href) => {
    if (href?.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      <nav className="w-full h-20 px-6 md:px-10 flex items-center justify-between glass-card noise premium-border rounded-[1.5rem] md:rounded-[2rem] sticky top-6 z-50 backdrop-blur-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] max-w-7xl mx-auto mb-12 translate-y-0 hover:translate-y-[-2px] transition-transform duration-500">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center brand-glow rotate-[-10deg] group-hover:rotate-0 transition-transform duration-500">
            <Sparkles size={20} className="text-white animate-pulse" />
          </div>
          <div className="text-xl font-black tracking-tighter text-white ml-1">
            {logoText}
          </div>
        </div>
        
        {/* Desktop Links - Improved Tablet Responsiveness */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10">
          {links?.slice(0, 4).map((link, i) => {
               const label = typeof link === 'string' ? link : link.label;
               const href = typeof link === 'string' ? `#${link.toLowerCase()}` : link.href;
               return (
                <a 
                  key={i} 
                  href={href} 
                  onClick={(e) => handleScroll(e, href)}
                  target={href?.startsWith('http') ? "_blank" : undefined}
                  rel={href?.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-brand transition-all duration-300 relative group/link whitespace-nowrap"
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all duration-300 group-hover/link:w-full" />
                </a>
              );
          })}
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={onLaunch}
            className="hidden sm:flex items-center gap-2 px-6 lg:px-8 py-3.5 bg-brand text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all duration-500 shadow-2xl brand-glow inner-glow"
          >
            Launch App
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/10 z-[50] ${
              isOpen ? "opacity-0 pointer-events-none" : ""
            }`}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <React.Fragment key="mobile-menu-portal">
         <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 bg-black z-[100] flex flex-col lg:hidden"
              >
                 {/* Header inside Mobile Menu */}
                 <div className="sticky top-0 h-24 px-6 flex items-center justify-between border-b border-white/5 bg-black/95 backdrop-blur-xl shrink-0 z-20">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center brand-glow shadow-lg">
                          <Sparkles size={20} className="text-white" />
                        </div>
                        <span className="text-xl font-black text-white uppercase tracking-tighter">{logoText}</span>
                      </div>
                      <button 
                        onClick={() => setIsOpen(false)}
                        className="w-12 h-12 rounded-xl bg-white/5 text-white flex items-center justify-center hover:bg-white/10 transition-all border border-white/10 group/close"
                        aria-label="Close menu"
                      >
                        <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                      </button>
                 </div>
      
                <div className="flex-1 overflow-y-auto p-8 space-y-12 relative pb-20">
                   {/* Neural Background Glow */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand/5 blur-[120px] rounded-full pointer-events-none opacity-30" />
                   
                  <div className="flex flex-col gap-8 relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 ml-1">Interface Navigation</span>
                    {links?.slice(0, 4).map((link, id) => {
                      const label = typeof link === 'string' ? link : link.label;
                      const href = typeof link === 'string' ? `#${link.toLowerCase().replace(/\s+/g, '-')}` : link.href;
                      return (
                        <motion.a 
                          key={id} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + (id * 0.05) }}
                          href={href}
                          onClick={(e) => handleScroll(e, href)}
                          target={href?.startsWith('http') ? "_blank" : undefined}
                          rel={href?.startsWith('http') ? "noopener noreferrer" : undefined}
                          className="text-2xl sm:text-4xl font-black text-white hover:text-brand transition-all uppercase tracking-tighter flex items-center justify-between group py-4 border-b border-white/5 last:border-0"
                        >
                          {label}
                          <ArrowRight size={38} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-brand" />
                        </motion.a>
                      );
                    })}
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-12 relative z-10"
                  >
                    <button 
                      onClick={() => {
                        onLaunch();
                        setIsOpen(false);
                      }}
                      className="w-full py-7 bg-brand text-white rounded-[2rem] text-sm font-black uppercase tracking-[0.2em] brand-glow inner-glow shadow-[0_20px_60px_-10px_hsla(var(--brand-glow)/0.6)] active:scale-95 transition-all"
                    >
                      Launch Experience
                    </button>
                    <p className="mt-8 text-center text-[10px] font-black text-zinc-700 uppercase tracking-[0.6em]">
                      Neural Core v1.0
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}
         </AnimatePresence>
      </React.Fragment>
    </>
  );
};

export default Nav;
