import { BrainCircuit, TrendingUp, AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AiInsightsCard() {
  return (
    <div className="bg-gradient-to-br from-indigo-900 to-[#0B1020] rounded-xl shadow-lg border border-indigo-500/20 p-6 flex flex-col h-full relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-500 rounded-full blur-[60px] opacity-20 pointer-events-none"></div>

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
          <BrainCircuit className="h-5 w-5" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-[15px] font-bold text-white tracking-tight">Nova AI Insights</h3>
          <p className="text-[12px] text-indigo-300">System intelligence active</p>
        </div>
      </div>

      <div className="flex-1 space-y-4 relative z-10">
        <p className="text-white text-[15px] font-medium leading-relaxed">Good morning. Here is your enterprise summary.</p>
        
        <div className="space-y-3 mt-4">
          <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
            <TrendingUp className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <p className="text-[13px] text-slate-200 leading-tight">Production efficiency increased by <strong className="text-white">6%</strong> across assembly lines A and B.</p>
          </div>
          
          <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
            <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-[13px] text-slate-200 leading-tight">Two materials (<span className="text-white">Lithium Coils, Thermal Paste</span>) require immediate replenishment.</p>
          </div>
          
          <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
            <Clock className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
            <p className="text-[13px] text-slate-200 leading-tight">One supplier delivery from <span className="text-white">TechComponents Ltd</span> is delayed by 48 hours.</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10 relative z-10">
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium border-0 shadow-sm transition-all h-10">
          View Detailed Insights
        </Button>
      </div>
    </div>
  );
}
