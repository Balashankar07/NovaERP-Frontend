import { ShoppingCart, ShieldCheck, Truck, AlertTriangle, ChevronRight, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardSummaryDto } from "@/types/reports.types";
import { WidgetState } from "@/hooks/use-dashboard-data";

interface TasksPanelProps {
  summary: WidgetState<DashboardSummaryDto>;
}

export function TasksPanel({ summary }: TasksPanelProps) {
  const { data, status } = summary;

  const tasks = data ? [
    { id: 1, title: "Pending Quality Inspections", count: data.pendingQualityInspections, icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
    { id: 2, title: "Open Purchase Orders", count: data.openPurchaseOrders, icon: ShoppingCart, color: "text-amber-500", bg: "bg-amber-50" },
    { id: 3, title: "Pending Shipments", count: data.shipmentsPending, icon: Truck, color: "text-blue-500", bg: "bg-blue-50" },
    { id: 4, title: "Open Warranty Claims", count: data.openWarrantyClaims, icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50" },
  ].filter(t => t.count > 0) : [];

  const totalTasks = tasks.reduce((acc, t) => acc + t.count, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full min-h-[300px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[15px] font-semibold text-slate-900 tracking-tight">Today's Tasks</h3>
        {status === "success" && (
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
            {totalTasks} total
          </span>
        )}
      </div>
      
      <div className="flex-1 flex flex-col gap-3 justify-center">
        {status === "loading" && (
          <div className="w-full flex-1 bg-slate-50 animate-pulse rounded-lg border border-slate-100 flex items-center justify-center">
             <div className="h-8 w-8 text-slate-300 animate-spin border-4 border-slate-300 border-t-slate-400 rounded-full" />
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center justify-center text-rose-500 h-full">
            <AlertCircle className="h-10 w-10 mb-2 opacity-80" />
            <p className="font-medium text-sm">Failed to load tasks</p>
          </div>
        )}

        {status === "success" && tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center text-slate-400 h-full">
            <CheckCircle className="h-10 w-10 mb-3 opacity-30 text-emerald-500" />
            <p className="font-medium text-sm">All caught up!</p>
          </div>
        )}

        {status === "success" && tasks.length > 0 && tasks.map((task) => (
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
        <Button variant="outline" className="w-full text-slate-600 border-slate-200 hover:bg-slate-50 font-medium h-9 text-[13px]" disabled={status !== "success"}>
          View All Tasks
        </Button>
      </div>
    </div>
  );
}
