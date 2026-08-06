import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const mockData = [
  { name: "Jan", units: 4000 },
  { name: "Feb", units: 3000 },
  { name: "Mar", units: 2000 },
  { name: "Apr", units: 2780 },
  { name: "May", units: 1890 },
  { name: "Jun", units: 2390 },
  { name: "Jul", units: 3490 },
];

export function ProductionChart() {
  return (
    <Card className="col-span-1 lg:col-span-4">
      <CardHeader>
        <CardTitle>Monthly Production (Units)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={mockData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dx={-10} />
              <Tooltip 
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}
              />
              <Area
                type="monotone"
                dataKey="units"
                stroke="var(--primary)"
                fillOpacity={1}
                fill="url(#colorUnits)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
