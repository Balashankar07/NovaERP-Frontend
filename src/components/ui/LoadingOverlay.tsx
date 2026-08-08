import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  className?: string;
}

export function LoadingOverlay({ isLoading, message = "Processing...", className }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className={cn("absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm rounded-md", className)}>
      <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-2" />
      {message && <p className="text-sm font-medium text-slate-700">{message}</p>}
    </div>
  );
}
