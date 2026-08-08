import { cn } from "@/lib/utils";
import {
  CircleDollarSign,
  Factory,
  Warehouse,
  ShoppingCart,
  Users,
  ShieldCheck,
  Truck,
  Package,
  AlertCircle
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { DashboardSummaryDto } from "@/types/reports.types";
import { WidgetState } from "@/hooks/use-dashboard-data";
import { formatCurrency, formatNumber } from "@/utils/formatters";

const data = [
  { value: 400 }, { value: 300 }, { value: 550 }, { value: 450 }, { value: 700 }
];

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: any;
  trend?: string;
  trendUp?: boolean;
}

function MiniTrendGraph({ color }: { color: string }) {
  return (
    <div className="h-10 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.2} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="value" stroke={color} fillOpacity={1} fill={`url(#gradient-${color})`} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function KpiCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 w-24 bg-slate-200 rounded"></div>
        <div className="h-8 w-8 bg-slate-200 rounded-lg"></div>
      </div>
      <div className="flex items-end justify-between mt-4">
        <div>
          <div className="h-8 w-16 bg-slate-200 rounded mb-2"></div>
          <div className="h-3 w-20 bg-slate-200 rounded"></div>
        </div>
        <div className="h-10 w-24 bg-slate-100 rounded"></div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon: Icon, trend, trendUp }: KpiCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-semibold text-slate-500 uppercase tracking-wide">{title}</h3>
        <div className="p-2 bg-slate-50 rounded-lg text-slate-600 border border-slate-100">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">{value}</div>
          {trend && trendUp !== undefined && (
            <div className={cn(
              "flex items-center gap-1.5 mt-2 text-[13px] font-medium",
              trendUp ? "text-emerald-600" : "text-amber-600"
            )}>
              <span>{trendUp ? "+" : ""}{trend}</span>
              <span className="text-slate-400 font-normal">vs last month</span>
            </div>
          )}
        </div>
        {trend !== undefined && trendUp !== undefined && (
           <MiniTrendGraph color={trendUp ? "#10b981" : "#f59e0b"} />
        )}
      </div>
    </div>
  );
}

export function EnterpriseKpiGrid({ summary }: { summary: WidgetState<DashboardSummaryDto> }) {
  if (summary.status === "loading") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Array.from({ length: 8 }).map((_, i) => <KpiCardSkeleton key={i} />)}
      </div>
    );
  }

  if (summary.status === "error" || !summary.data) {
    return (
      <div className="w-full bg-rose-50 border border-rose-200 text-rose-600 rounded-xl p-6 flex flex-col items-center justify-center mb-6">
        <AlertCircle className="h-8 w-8 mb-2" />
        <p className="font-semibold text-sm">Failed to load Dashboard KPIs</p>
        <p className="text-xs text-rose-500 mt-1">Please try refreshing the page</p>
      </div>
    );
  }

  const { data } = summary;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <KpiCard title="Total Products" value={formatNumber(data.totalProducts)} icon={Package} trend="5.2%" trendUp={true} />
      <KpiCard title="Total Suppliers" value={formatNumber(data.totalSuppliers)} icon={Users} trend="2.1%" trendUp={true} />
      <KpiCard title="Total Warehouses" value={formatNumber(data.totalWarehouses)} icon={Warehouse} trend="0.0%" trendUp={true} />
      <KpiCard title="Inventory Value" value={formatCurrency(data.totalInventoryValue)} icon={CircleDollarSign} trend="-1.2%" trendUp={false} />
      
      <KpiCard title="Completed Production" value={formatNumber(data.completedProductionOrders)} icon={Factory} trend="8.4%" trendUp={true} />
      <KpiCard title="Open Purchase Orders" value={formatNumber(data.openPurchaseOrders)} icon={ShoppingCart} trend="-4.5%" trendUp={false} />
      <KpiCard title="Active Warranties" value={formatNumber(data.activeWarranties)} icon={ShieldCheck} trend="12.1%" trendUp={true} />
      <KpiCard title="Pending Shipments" value={formatNumber(data.shipmentsPending)} icon={Truck} trend="3.2%" trendUp={true} />
    </div>
  );
}
