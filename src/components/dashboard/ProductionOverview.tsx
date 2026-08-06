import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", target: 4000, actual: 4100, defects: 120 },
  { name: "Tue", target: 4000, actual: 3800, defects: 150 },
  { name: "Wed", target: 4200, actual: 4300, defects: 110 },
  { name: "Thu", target: 4200, actual: 4500, defects: 90 },
  { name: "Fri", target: 4500, actual: 4600, defects: 100 },
  { name: "Sat", target: 4500, actual: 4800, defects: 140 },
  { name: "Sun", target: 4800, actual: 5000, defects: 130 },
];

export function ProductionOverview() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900 tracking-tight">Production Output</h3>
          <p className="text-[13px] text-slate-500 mt-1">Target vs Actual units produced with defect correlation.</p>
        </div>
        <div className="flex gap-4 text-[13px] font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
            <span className="text-slate-600">Target</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
            <span className="text-slate-600">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
            <span className="text-slate-600">Defects</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1e293b" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#1e293b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ fontSize: '13px' }}
              labelStyle={{ fontSize: '13px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}
            />
            <Area type="monotone" dataKey="target" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorTarget)" />
            <Area type="monotone" dataKey="actual" stroke="#1e293b" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" />
            <Area type="monotone" dataKey="defects" stroke="#f87171" strokeWidth={2} fillOpacity={0.2} fill="#f87171" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
