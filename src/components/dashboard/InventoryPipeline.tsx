import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Package, ShoppingCart, Truck } from "lucide-react";

const inventoryData = [
  { name: "Processors", safe: 12000, critical: 1500, excess: 0 },
  { name: "Displays", safe: 8500, critical: 800, excess: 200 },
  { name: "Batteries", safe: 15000, critical: 4000, excess: 1000 },
  { name: "Sensors", safe: 25000, critical: 1000, excess: 5000 },
];

export function InventoryPipeline() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-[15px] font-semibold text-slate-900 tracking-tight">Inventory & Procurement</h3>
        <p className="text-[13px] text-slate-500 mt-1">Component stock levels and supply chain pipeline.</p>
      </div>
      
      <div className="flex-1 w-full h-[200px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={inventoryData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} width={80} />
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
      </div>

      <div className="pt-5 border-t border-slate-100">
        <h4 className="text-[13px] font-semibold text-slate-900 mb-4">Procurement Pipeline</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-slate-500 mb-1">
              <Package className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Requests</span>
            </div>
            <span className="text-lg font-bold text-slate-900">142</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-indigo-500 mb-1">
              <ShoppingCart className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Approved</span>
            </div>
            <span className="text-lg font-bold text-slate-900">38</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-amber-500 mb-1">
              <Truck className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Expected</span>
            </div>
            <span className="text-lg font-bold text-slate-900">12</span>
          </div>
        </div>
      </div>
    </div>
  );
}
