import { ClipboardCheck, ShoppingCart, ShieldCheck, UserX, AlertTriangle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const tasks = [
  { id: 1, title: "Pending Approvals", count: 12, icon: ClipboardCheck, color: "text-blue-500", bg: "bg-blue-50" },
  { id: 2, title: "Purchase Requests", count: 4, icon: ShoppingCart, color: "text-amber-500", bg: "bg-amber-50" },
  { id: 3, title: "Quality Reviews", count: 8, icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
  { id: 4, title: "Employee Leave", count: 3, icon: UserX, color: "text-slate-500", bg: "bg-slate-50" },
  { id: 5, title: "Production Alerts", count: 2, icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50" },
];

export function TasksPanel() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[15px] font-semibold text-slate-900 tracking-tight">Today's Tasks</h3>
        <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
          29 total
        </span>
      </div>
      
      <div className="flex-1 flex flex-col gap-3">
        {tasks.map((task) => (
          <div key={task.id} className="group flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-md ${task.bg}`}>
                <task.icon className={`h-4 w-4 ${task.color}`} strokeWidth={2} />
              </div>
              <span className="text-[14px] font-medium text-slate-800">{task.title}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-bold text-slate-900">{task.count}</span>
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100">
        <Button variant="outline" className="w-full text-slate-600 border-slate-200 hover:bg-slate-50 font-medium h-9 text-[13px]">
          View All Tasks
        </Button>
      </div>
    </div>
  );
}
