import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AlertCircle, Boxes } from "lucide-react";
import { InventoryReportDto } from "@/types/reports.types";
import { WidgetState } from "@/hooks/use-dashboard-data";

interface InventoryPipelineProps {
  inventory: WidgetState<InventoryReportDto[]>;
}

export function InventoryPipeline({ inventory }: InventoryPipelineProps) {
  const { data, status } = inventory;

  // Process data for the stacked bar chart (top 5 items by quantity or total value)
  const chartData = data
    ? data.slice(0, 5).map(item => {
        const q = item.quantityOnHand;
        const min = item.minStockLevel;
        const max = item.maxStockLevel;
        
        // Critical is the portion up to minStockLevel
        const critical = Math.min(q, min);
        // Safe is the portion between min and max
        const safe = Math.max(0, Math.min(q - min, max - min));
        // Excess is anything above max
        const excess = Math.max(0, q - max);

        return {
          name: item.productName.length > 15 ? item.productName.substring(0, 15) + '...' : item.productName,
          safe,
          critical,
          excess,
        };
      })
    : [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full min-h-[400px]">
      <div className="mb-6">
        <h3 className="text-[15px] font-semibold text-slate-900 tracking-tight">Inventory Levels</h3>
        <p className="text-[13px] text-slate-500 mt-1">Top components grouped by stock status.</p>
      </div>
      
      <div className="flex-1 w-full h-[200px] mb-6 flex items-center justify-center">
        {status === "loading" && (
          <div className="w-full h-full bg-slate-50 animate-pulse rounded-lg border border-slate-100 flex items-center justify-center">
             <div className="h-8 w-8 text-slate-300 animate-spin border-4 border-slate-300 border-t-slate-400 rounded-full" />
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center justify-center text-rose-500">
            <AlertCircle className="h-10 w-10 mb-2 opacity-80" />
            <p className="font-medium text-sm">Failed to load Inventory Data</p>
          </div>
        )}

        {status === "empty" && (
          <div className="flex flex-col items-center justify-center text-slate-400">
            <Boxes className="h-10 w-10 mb-3 opacity-30" />
            <p className="font-medium text-sm">No inventory data available</p>
          </div>
        )}

        {status === "success" && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} width={90} />
              <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontSize: '13px' }}
              />
              <Bar dataKey="critical" name="Critical Stock" stackId="a" fill="#f43f5e" radius={[4, 0, 0, 4]} barSize={24} />
              <Bar dataKey="safe" name="Safe Stock" stackId="a" fill="#6366f1" barSize={24} />
              <Bar dataKey="excess" name="Excess Inventory" stackId="a" fill="#cbd5e1" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="pt-5 border-t border-slate-100">
        <h4 className="text-[13px] font-semibold text-slate-900 mb-4">Procurement Pipeline</h4>
        <div className="flex items-center justify-center py-4 bg-slate-50 rounded-lg border border-slate-100 border-dashed">
           <span className="text-xs text-slate-400 font-medium">Procurement APIs Unavailable</span>
        </div>
      </div>
    </div>
  );
}
