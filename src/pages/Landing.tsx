import React, { useState } from 'react';
import { Send, Zap, Shield, Activity, Github, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface LandingProps {
  onLaunch: (prompt?: string) => void;
}

const Landing: React.FC<LandingProps> = ({ onLaunch }) => {
  const [value, setValue] = useState("");
  const [isPending, setIsPending] = useState(false);

  const onSubmit = () => {
    if (!value.trim()) return;
    setIsPending(true);
    setTimeout(() => {
      onLaunch(value);
    }, 800);
  };

  const onTryExample = (example: string) => {
    setValue(example);
    setIsPending(true);
    setTimeout(() => {
      onLaunch(example);
    }, 800);
  };

  const handleScroll = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.slice(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const features = [
    {
      icon: Zap,
      title: "Instant Synthesis",
      description: "From zero to full-stack React components in seconds. Real-time generation that feels like magic."
    },
    {
      icon: Shield,
      title: "Enterprise Grade",
      description: "Built on top of Shadcn UI and Tailwind CSS. Clean, accessible, and production-ready code by default."
    },
    {
      icon: Activity,
      title: "Live Preview",
      description: "Iterate at the speed of thought. Watch your components evolve as you prompt with our integrated canvas."
    }
  ];

  const stats = [
    { label: "Components", value: "24+" },
    { label: "Synthesis Speed", value: "< 2s" },
    { label: "Custom Styles", value: "∞" },
    { label: "Users", value: "Alpha" }
  ];

  const sections = [
    { id: 'top', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'stats', label: 'Performance' },
    { id: 'cta', label: 'Get Started' }
  ];

  return (
    <div id="top" className="flex-1 overflow-y-auto relative flex flex-col bg-[#000000] selection:bg-brand selection:text-white scroll-smooth pt-24">
      <div className="fixed inset-0 pointer-events-none mesh-gradient noise z-0 overflow-hidden" />
      
      {/* Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-7xl">
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/5 px-6 md:px-10 py-4 rounded-[2rem] flex items-center justify-between font-sans shadow-none">
          <a href="#top" onClick={(e) => handleScroll(e, '#top')} className="flex items-center gap-2 group cursor-pointer">
             <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center brand-glow rotate-[-10deg] group-hover:rotate-0 transition-transform duration-500">
               <Sparkles size={20} className="text-white animate-pulse" />
             </div>
             <div className="text-xl font-black tracking-tighter text-white ml-1 italic uppercase">
               Intent <span className="text-brand">UI</span>
             </div>
          </a>

          <div className="hidden md:flex items-center gap-10">
            <a href="#features" onClick={(e) => handleScroll(e, '#features')} className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">Features</a>
            <a href="https://github.com/devtofunmi/intent-ui" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">
              <Github size={14} /> GitHub
            </a>
          </div>

          <button 
            onClick={() => onLaunch()}
            className="px-6 py-2.5 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-none"
          >
            Launch App
          </button>
        </div>
      </nav>

      {/* Main Landing Content */}
      <div className="flex flex-col space-y-32 pb-32">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center relative z-10 max-w-7xl mx-auto px-10 md:px-16 text-center w-full">
          <div className="space-y-10 max-w-4xl w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-[0.9] drop-shadow-none">
                Design your <span className="text-brand">Vision</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 font-medium max-w-xl mx-auto tracking-wide leading-relaxed px-4">
                Build apps and websites by chatting with AI. Experience the magic of neural synthesis.
              </p>
            </div>

            <div className="w-full max-w-2xl mx-auto relative group pt-4">
              <div className="absolute -inset-4 bg-brand/20 blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000 overflow-hidden" />
              <div className="relative z-10">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
                  placeholder="What do you want to build today?"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] px-6 md:px-8 py-5 md:py-6 pr-16 md:pr-24 text-base md:text-lg font-bold text-white placeholder:text-zinc-700 outline-none focus:border-brand/50 transition-all shadow-none noise overflow-hidden"
                />
                <button
                  onClick={onSubmit}
                  disabled={isPending || !value.trim()}
                  className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 h-10 md:h-12 aspect-square bg-brand text-white rounded-[1.2rem] md:rounded-[1.8rem] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-none border border-brand/20 z-20 disabled:opacity-50 disabled:grayscale"
                >
                  {isPending ? (
                    <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 md:w-6 md:h-6 border-none outline-none" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex flex-wrap justify-center gap-3 pt-4">
                {["SaaS Landing Page", "Admin Dashboard", "Portfolio with Bento Grid"].map((example) => (
                  <button
                    key={example}
                    onClick={() => onTryExample(example)}
                    className="px-6 md:px-8 py-2 md:py-3 rounded-full bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all shadow-none"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full relative overflow-hidden scroll-mt-24 max-w-7xl mx-auto px-10 md:px-16">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
              <div className="max-w-2xl space-y-6">
                <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] text-gradient italic uppercase">
                  Neural <br /> Infrastructure
                </h2>
                <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-lg leading-relaxed">
                  Experience the convergence of artificial intelligence and high-fidelity interface design.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
              {features.map((f, i) => {
                const Icon = f.icon;
                const isFullWidth = i === 2 && features.length === 3;
                const isLarge = (i === 0) && !isFullWidth;
                
                return (
                  <div 
                    key={i} 
                    className={cn(
                      "glass-card noise premium-border p-8 md:p-12 rounded-[2.5rem] flex flex-col justify-center group h-auto min-h-[380px] transition-all duration-700 shadow-none overflow-hidden",
                      isFullWidth ? "md:col-span-12" : isLarge ? "md:col-span-12 lg:col-span-7" : "md:col-span-12 lg:col-span-5"
                    )}
                  >
                    <div className="space-y-8 w-full max-w-none relative z-10">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-all duration-500 brand-glow border border-brand/20 shadow-none">
                        <Icon size={28} className="text-brand group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight group-hover:text-brand transition-colors duration-500 italic uppercase leading-none">
                          {f.title}
                        </h3>
                        <p className="text-zinc-500 leading-relaxed font-medium text-lg md:text-xl">
                          {f.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="w-full py-12 md:py-24 px-6 md:px-8 relative overflow-hidden scroll-mt-24">
          <div className="max-w-7xl mx-auto glass-card noise premium-border py-12 md:py-24 px-6 md:px-12 rounded-[2.5rem] md:rounded-[4rem] shadow-none relative">
            <div className="absolute inset-0 bg-brand/5 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 relative z-10">
              {stats?.map((s, i) => (
                <div key={i} className="text-center space-y-3 group min-w-0">
                  <div className={cn(
                    "text-xl md:text-4xl font-black text-white tracking-tighter brand-gradient-text group-hover:scale-110 transition-transform duration-500 px-2 break-words leading-none",
                    s.value?.length <= 5 && "whitespace-nowrap"
                  )}>
                    {s.value}
                  </div>
                  <div className="text-[9px] md:text-xs font-black uppercase tracking-[0.4em] text-zinc-500 group-hover:text-brand transition-colors duration-500 px-1 break-words line-clamp-2">
                    {s.label}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-brand/30 mx-auto group-hover:bg-brand group-hover:w-4 transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="w-full max-w-7xl mx-auto px-10 md:px-16 scroll-mt-24">
          <div className="relative overflow-hidden bg-[#000000] rounded-[2.5rem] md:rounded-[5rem] p-8 md:p-32 text-center border border-white/5 mesh-gradient noise group shadow-none">
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-brand/10 blur-[150px] rounded-full animate-pulse group-hover:scale-110 transition-transform duration-[3000ms] pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-brand/5 blur-[150px] rounded-full animate-pulse group-hover:scale-110 transition-transform duration-[3000ms] delay-1000 pointer-events-none" />
            
            <div className="max-w-4xl mx-auto space-y-8 md:space-y-14 relative z-10">
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-2xl  md:text-7xl font-black text-white tracking-[-0.05em] leading-[1.2] text-gradient italic uppercase">
                  Ready to manifest <br />
                  <span className="text-white/30 truncate uppercase">your next project?</span>
                </h2>
                <p className="text-zinc-500 font-medium text-lg md:text-2xl max-w-2xl mx-auto leading-tight md:leading-snug">
                  Join the elite league of developers building with neural intent.
                </p>
              </div>
              
              <div className="pt-2 md:pt-4 flex flex-col items-center justify-center">
                <button 
                  onClick={() => onLaunch()}
                  className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-7 bg-brand text-white rounded-[1.5rem] md:rounded-[2.5rem] font-black text-sm md:text-base hover:scale-105 transition-all duration-500 active:scale-95 shadow-none flex items-center justify-center gap-3 md:gap-4 group brand-glow inner-glow relative overflow-hidden uppercase tracking-widest"
                >
                   <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[-30deg]" />
                  <span className="relative z-10 font-black">Get Started Now</span>
                 </button>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand/30 to-transparent opacity-50" />
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full max-w-7xl mx-auto px-10 md:px-16 relative group/footer z-10">
          <div className="glass-card noise premium-border p-10 md:p-24 rounded-[3rem] md:rounded-[4rem] relative overflow-hidden shadow-none transition-all duration-1000">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 blur-[150px] rounded-full pointer-events-none group-hover/footer:bg-brand/10 transition-colors duration-1000" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 relative z-10 mb-20 xl:mb-40">
              <div className="space-y-12 text-left">
                <div className="space-y-6">
                  <div className="text-4xl font-black tracking-[-0.05em] text-white brand-gradient-text uppercase leading-none italic">
                    Intent <span className="text-brand">UI</span>
                  </div>
                  <p className="text-zinc-500 text-xl md:text-2xl font-medium leading-tight max-w-md">
                    Architecting the next generation of human-machine intent interfaces.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-12 md:gap-24">
                <div className="space-y-10 flex flex-col items-start md:items-end">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-brand/80">Platform</h4>
                  <ul className="space-y-6 text-left md:text-right">
                    {sections.map((s) => (
                      <li key={s.id}>
                        <a 
                          href={`#${s.id}`} 
                          onClick={(e) => handleScroll(e, `#${s.id}`)}
                          className="text-zinc-500 hover:text-white transition-all duration-500 text-lg md:text-xl font-bold tracking-tight inline-block hover:-translate-x-2 relative group/link"
                        >
                          {s.label}
                          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand opacity-0 group-hover/link:opacity-100 transition-all duration-500" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-10 flex flex-col items-start md:items-end">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-brand/80">Connect</h4>
                  <ul className="space-y-6 text-left md:text-right">
                    <li>
                      <a href="https://github.com/devtofunmi/intent-ui" className="text-zinc-500 hover:text-white transition-colors text-lg md:text-xl font-bold tracking-tight inline-block hover:-translate-x-2">
                        GitHub
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="pt-16 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-10 relative z-10">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-10 text-left">
                <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em]">
                  © 2026 INTENT UI TECHNOLOGIES CO.
                </p>
                <div className="hidden lg:block w-1.5 h-1.5 rounded-full bg-brand/20" />
                <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em]">
                  Neural Core Enabled
                </p>
              </div>
            </div>

            {/* Subtle Watermark */}
            <div className="absolute bottom-8 right-12 opacity-[0.02] pointer-events-none select-none">
               <div className="text-[120px] font-black tracking-tighter leading-none italic uppercase">Intent</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;