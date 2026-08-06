import { FileText, Plus, Edit2, Trash2, AlertCircle, Clock } from "lucide-react";
import { AuditReportDto } from "@/types/reports.types";
import { WidgetState } from "@/hooks/use-dashboard-data";

interface ActivityTimelineProps {
  audit: WidgetState<AuditReportDto[]>;
}

export function ActivityTimeline({ audit }: ActivityTimelineProps) {
  const { data, status } = audit;

  const getActivityIconAndColor = (action: string) => {
    const act = action.toLowerCase();
    if (act.includes("create") || act.includes("add")) {
      return { icon: Plus, color: "text-emerald-500", bg: "bg-emerald-50" };
    }
    if (act.includes("update") || act.includes("edit")) {
      return { icon: Edit2, color: "text-blue-500", bg: "bg-blue-50" };
    }
    if (act.includes("delete") || act.includes("remove")) {
      return { icon: Trash2, color: "text-rose-500", bg: "bg-rose-50" };
    }
    return { icon: FileText, color: "text-slate-500", bg: "bg-slate-50" };
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col min-h-[300px]">
      <div className="mb-6">
        <h3 className="text-[15px] font-semibold text-slate-900 tracking-tight">Recent Enterprise Activity</h3>
      </div>
      
      <div className="relative pl-3 flex-1 flex flex-col justify-center">
        {status === "loading" && (
          <div className="w-full h-full bg-slate-50 animate-pulse rounded-lg border border-slate-100 flex items-center justify-center">
             <div className="h-8 w-8 text-slate-300 animate-spin border-4 border-slate-300 border-t-slate-400 rounded-full" />
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center justify-center text-rose-500">
            <AlertCircle className="h-10 w-10 mb-2 opacity-80" />
            <p className="font-medium text-sm">Failed to load Recent Activity</p>
          </div>
        )}

        {status === "empty" && (
          <div className="flex flex-col items-center justify-center text-slate-400 py-10">
            <Clock className="h-10 w-10 mb-3 opacity-30" />
            <p className="font-medium text-sm">No recent activity</p>
          </div>
        )}

        {status === "success" && data && (
          <>
            {/* Vertical line connecting timeline */}
            <div className="absolute top-2 bottom-2 left-[27px] w-[2px] bg-slate-100"></div>
            
            <div className="space-y-6">
              {data.slice(0, 8).map((activity) => {
                const { icon: Icon, color, bg } = getActivityIconAndColor(activity.action);
                
                return (
                  <div key={activity.id} className="relative flex items-start gap-4">
                    <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${bg} border border-white ring-4 ring-white`}>
                      <Icon className={`h-4 w-4 ${color}`} strokeWidth={2} />
                    </div>
                    <div className="flex flex-col flex-1 pb-1">
                      <div className="flex items-center justify-between">
                        <p className="text-[14px] font-medium text-slate-800">
                          {activity.action} {activity.entityName}
                        </p>
                        <span className="text-[12px] text-slate-400">{formatTime(activity.timestamp)}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                          {activity.entityName}
                        </span>
                        {activity.userName && (
                          <span className="text-[12px] text-slate-500">by {activity.userName}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
