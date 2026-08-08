import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface StatusBadgeProps {
  isActive: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
  className?: string;
}

export function StatusBadge({ 
  isActive, 
  activeLabel = "Active", 
  inactiveLabel = "Inactive",
  className 
}: StatusBadgeProps) {
  if (isActive) {
    return (
      <Badge variant="outline" className={cn("bg-emerald-50 text-emerald-700 border-emerald-200 flex w-fit items-center gap-1.5", className)}>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
        {activeLabel}
      </Badge>
    );
  }
  
  return (
    <Badge variant="outline" className={cn("bg-rose-50 text-rose-700 border-rose-200 flex w-fit items-center gap-1.5", className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" />
      {inactiveLabel}
    </Badge>
  );
}
