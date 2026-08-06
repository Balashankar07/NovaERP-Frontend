import React from "react";
import { Loader2, AlertCircle, FileQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

interface StateViewProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function LoadingView({ className, title = "Loading...", description }: StateViewProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 min-h-[300px]", className)}>
      <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-4" />
      <h3 className="text-sm font-medium text-slate-700">{title}</h3>
      {description && <p className="text-xs text-slate-500 mt-1 text-center">{description}</p>}
    </div>
  );
}

export function ErrorView({ className, title = "An error occurred", description = "Failed to load data. Please try again.", icon }: StateViewProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 min-h-[300px]", className)}>
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
        {icon || <AlertCircle className="w-6 h-6 text-red-500" />}
      </div>
      <h3 className="text-sm font-medium text-slate-700">{title}</h3>
      <p className="text-xs text-slate-500 mt-1 text-center max-w-sm">{description}</p>
    </div>
  );
}

export function EmptyView({ className, title = "No records found", description = "Get started by creating a new record.", icon }: StateViewProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 min-h-[300px] border border-dashed border-slate-200 rounded-xl bg-slate-50/50", className)}>
      <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-sm">
        {icon || <FileQuestion className="w-6 h-6 text-slate-400" />}
      </div>
      <h3 className="text-sm font-medium text-slate-800">{title}</h3>
      <p className="text-xs text-slate-500 mt-1 text-center max-w-sm">{description}</p>
    </div>
  );
}
