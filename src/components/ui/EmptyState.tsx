import React from "react";
import { FileQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ 
  title, 
  description, 
  icon, 
  action,
  className 
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 min-h-[300px] border border-dashed border-slate-200 rounded-xl bg-slate-50/50", className)}>
      <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-sm">
        {icon || <FileQuestion className="w-6 h-6 text-slate-400" />}
      </div>
      <h3 className="text-sm font-medium text-slate-800">{title}</h3>
      <p className="text-xs text-slate-500 mt-1 text-center max-w-sm">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-5 px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-sm font-medium rounded-lg transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
