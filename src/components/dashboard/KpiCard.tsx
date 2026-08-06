import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export function KpiCard({ title, value, icon: Icon, trend, trendUp }: KpiCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/30">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        {trend && (
          <div className="mt-3 flex items-center gap-1.5 text-xs">
            <span
              className={cn(
                "flex items-center rounded-full px-2 py-0.5 font-medium",
                trendUp 
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                  : "bg-destructive/10 text-destructive dark:text-destructive"
              )}
            >
              {trendUp ? "+" : ""}{trend}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
