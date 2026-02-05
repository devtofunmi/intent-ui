import { Zap, Shield, Activity, ArrowUpRight, Cpu } from 'lucide-react';

const ActivityFeed = ({ 
  title = "System Pulse", 
  items = [
    { title: "Protocol Breach", desc: "Blocked unauthorized neural link", time: "2m ago", type: "warning" },
    { title: "Node Synchronized", desc: "Core status: Optimal", time: "15m ago", type: "success" },
    { title: "Data Migration", desc: "L3 cache flushed to mainnet", time: "1h ago", type: "info" }
  ]
}) => {
  const getIcon = (type) => {
    switch(type) {
      case 'warning': return <Zap className="text-amber-500" size={16} />;
      case 'success': return <Shield className="text-emerald-500" size={16} />;
      default: return <Cpu className="text-brand" size={16} />;
    }
  };

  return (
    <div className="w-full h-full"> 
      <div className="glass-card noise premium-border rounded-[2.5rem] p-8 h-full flex flex-col relative overflow-hidden group">
        {/* Animated Scanning Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand/20 to-transparent animate-[pulse_3s_infinite]" />
        
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
              <Activity size={14} className="text-brand animate-pulse" />
            </div>
            <h3 className="text-base font-black text-white uppercase tracking-[0.4em] italic leading-none">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">Live</span>
          </div>
        </div>

        <div className="flex-1 space-y-3 relative z-10 overflow-y-auto pr-2 scrollbar-hide">
          {items.map((item, i) => (
            <div key={i} className="group/item flex flex-col gap-3 p-5 rounded-2xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.04] hover:border-brand/20 transition-all duration-500 cursor-pointer relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover/item:bg-brand transition-all duration-500" />
              
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-zinc-950 border border-white/5 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform shadow-xl">
                    {getIcon(item.type)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-black text-white tracking-widest uppercase truncate leading-none mb-1.5">{item.title}</div>
                    <p className="text-[11px] text-zinc-500 font-medium truncate leading-none">{item.desc}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                   <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">{item.time}</span>
                   <ArrowUpRight size={10} className="text-zinc-800 group-hover/item:text-brand transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-6 w-full py-4 rounded-xl bg-white/[0.02] border border-white/5 text-[9px] font-black text-zinc-500 hover:text-white uppercase tracking-[0.4em] hover:bg-white/5 transition-all duration-500">
           Explore Neural Logs
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;
