import { useMemo } from 'react';
import { z } from 'zod';
import { cn } from '../lib/utils';
import { Activity, Shield, Zap, Cpu } from 'lucide-react';

// --- Schema Definition ---
export const dataSummarySchema = z.object({
  title: z.string().nullable().optional().describe("Main heading for the dashboard panel"),
  status: z.enum(['optimal', 'warning', 'critical']).nullable().optional().describe("Overall system health"),
  mainMetric: z.object({
    label: z.string().nullable().optional(),
    value: z.string().nullable().optional(),
    trend: z.string().nullable().optional()
  }).nullable().optional().describe("The primary high-impact data point"),
  metrics: z.array(z.object({
    label: z.string().nullable().optional(),
    value: z.string().nullable().optional(),
    trend: z.string().nullable().optional()
  })).nullable().optional().describe("Supporting performance metrics"),
  systemLoad: z.number().nullable().optional().describe("Current workload percentage (0-100)"),
});

// --- Component ---
export const DataSummary = ({
  title = "System Overview",
  status = "optimal",
  mainMetric,
  metrics = [],
  systemLoad = 45
}: z.infer<typeof dataSummarySchema>) => {
  
  const statusColors = {
    optimal: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    warning: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    critical: "text-rose-500 bg-rose-500/10 border-rose-500/20"
  };

  const loadColor = useMemo(() => {
    if (systemLoad && systemLoad > 80) return "bg-rose-500";
    if (systemLoad && systemLoad > 60) return "bg-amber-500";
    return "bg-brand";
  }, [systemLoad]);

  return (
    <div className="w-full glass-card noise premium-border rounded-[2.5rem] p-8 md:p-10 flex flex-col gap-10 group relative overflow-hidden bg-zinc-950/40">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand/5 blur-[120px] rounded-full pointer-events-none opacity-50" />
      
      {/* Header */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex flex-col gap-1.5">
          <span className="text-[9px] font-black text-brand uppercase tracking-[0.5em]">Neural Interface v4.2</span>
          <h3 className="text-2xl md:text-3xl font-black text-white italic tracking-tighter uppercase leading-none">{title}</h3>
        </div>
        <div className={cn(
          "px-4 py-2 rounded-xl border flex items-center gap-2 transition-all duration-500",
          statusColors[status || 'optimal']
        )}>
          <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest">{status || 'optimal'}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        
        {/* Left: Primary Status / Hero */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 relative group/hero overflow-hidden">
            <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover/hero:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 space-y-4">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">{mainMetric?.label || "Primary Core Throughput"}</span>
              <div className="flex items-baseline gap-4">
                <span className="text-5xl md:text-7xl font-black text-white tracking-tighter brand-gradient-text">
                  {mainMetric?.value || "84.2 GB/s"}
                </span>
                <span className="text-xs font-black text-emerald-500 italic uppercase">
                  {mainMetric?.trend || "+12.4%"}
                </span>
              </div>
            </div>
            {/* Minimalist Graphic Element */}
            <div className="mt-8 flex items-end gap-1 h-12">
               {[...Array(24)].map((_, i) => (
                 <div 
                   key={i} 
                   className="flex-1 bg-brand/20 rounded-full transition-all duration-700 group-hover/hero:bg-brand/40" 
                   style={{ height: `${20 + Math.random() * 80}%` }}
                 />
               ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {metrics?.slice(0, 2).map((m, i) => (
               <div key={i} className="p-6 rounded-[1.5rem] bg-zinc-900/50 border border-white/5 space-y-2">
                  <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-none">{m.label}</span>
                  <div className="flex flex-col md:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                    <span className="text-xl font-black text-white tracking-tight">{m.value}</span>
                    <span className="text-[9px] font-black text-emerald-500">{m.trend}</span>
                  </div>
               </div>
            ))}
          </div>
        </div>

        {/* Right: System Diagnostics */}
        <div className="lg:col-span-5 flex flex-col gap-6">
           <div className="p-8 rounded-[2rem] bg-zinc-950 border border-white/5 flex flex-col gap-8 h-full">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] font-black text-zinc-400 uppercase tracking-widest">Diagnostics</h4>
                <Cpu size={16} className="text-brand" />
              </div>

              <div className="space-y-6">
                 <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                       <span className="text-zinc-500">System Load</span>
                       <span className="text-white">{systemLoad || 45}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                       <div 
                         className={cn("h-full rounded-full transition-all duration-1000", loadColor)} 
                         style={{ width: `${systemLoad || 45}%` }} 
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 gap-4">
                    {[
                      { icon: Shield, label: "Security", status: "Enabled", color: "text-emerald-500" },
                      { icon: Zap, label: "Optimization", status: "Active", color: "text-brand" },
                      { icon: Activity, label: "Neural Link", status: "Stable", color: "text-zinc-400" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="flex items-center gap-3">
                          <item.icon size={14} className="text-zinc-500" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{item.label}</span>
                        </div>
                        <span className={cn("text-[9px] font-black uppercase tracking-widest italic", item.color)}>{item.status}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <button className="mt-auto w-full py-4 rounded-xl bg-brand text-white text-[10px] font-black uppercase tracking-widest brand-glow hover:scale-105 active:scale-95 transition-all">
                Full System Scan
              </button>
           </div>
        </div>
      </div>

      {/* Footer HUD */}
      <div className="pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
         <div className="flex gap-10">
            <div className="flex flex-col gap-1">
               <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Archive Status</span>
               <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter italic">Live Synchronized</span>
            </div>
            <div className="flex flex-col gap-1">
               <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Last Auth</span>
               <span className="text-[10px] font-black text-zinc-500 uppercase tracking-tighter italic">2m ago</span>
            </div>
         </div>
         <div className="text-[8px] font-mono text-zinc-800 uppercase tracking-[0.5em]">NeuralCore_Module_v4.2.0</div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand/40 to-transparent opacity-50" />
    </div>
  );
};
