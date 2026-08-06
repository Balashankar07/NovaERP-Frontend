import { cn } from "@/lib/utils";
import {
  CircleDollarSign,
  Factory,
  Boxes,
  Warehouse,
  ShoppingCart,
  Users,
  ShieldCheck,
  Truck
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

const data = [
  { value: 400 }, { value: 300 }, { value: 550 }, { value: 450 }, { value: 700 }
];

interface KpiCardProps {
  title: string;
  value: string;
  icon: any;
  trend: string;
  trendUp: boolean;
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
          <div className={cn(
            "flex items-center gap-1.5 mt-2 text-[13px] font-medium",
            trendUp ? "text-emerald-600" : "text-amber-600"
          )}>
            <span>{trendUp ? "+" : ""}{trend}</span>
            <span className="text-slate-400 font-normal">vs last month</span>
          </div>
        </div>
        <MiniTrendGraph color={trendUp ? "#10b981" : "#f59e0b"} />
      </div>
    </div>
  );
}

export function EnterpriseKpiGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <KpiCard title="Total Revenue" value="$4.2M" icon={CircleDollarSign} trend="12.5%" trendUp={true} />
      <KpiCard title="Production Orders" value="1,248" icon={Factory} trend="8.2%" trendUp={true} />
      <KpiCard title="Inventory Value" value="$12.8M" icon={Boxes} trend="-2.4%" trendUp={false} />
      <KpiCard title="Warehouse Utils" value="84%" icon={Warehouse} trend="4.1%" trendUp={true} />
      
      <KpiCard title="Pending Procurement" value="42" icon={ShoppingCart} trend="-1.5%" trendUp={false} />
      <KpiCard title="Employees Online" value="356" icon={Users} trend="12" trendUp={true} />
      <KpiCard title="Quality Pass Rate" value="99.2%" icon={ShieldCheck} trend="0.4%" trendUp={true} />
      <KpiCard title="Today's Shipments" value="84" icon={Truck} trend="14" trendUp={true} />
    </div>
  );
}
