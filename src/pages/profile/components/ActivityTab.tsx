import { Activity } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

export function ActivityTab() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-6 md:p-8">
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
        <p className="text-sm text-slate-500 mt-1">Your recent actions and security events.</p>
      </div>

      <EmptyState
        title="No Activity Data"
        description="Activity history will appear once backend auditing is available. Currently pending backend integration."
        icon={<Activity className="w-6 h-6 text-slate-400" />}
      />
    </div>
  );
}
