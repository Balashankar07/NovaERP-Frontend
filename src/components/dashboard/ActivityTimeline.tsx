import { Factory, ShoppingCart, Boxes, ShieldCheck, Truck, UserPlus } from "lucide-react";

const activities = [
  { id: 1, title: "Production Order Approved", module: "Production", time: "10 mins ago", icon: Factory, color: "text-indigo-500", bg: "bg-indigo-50" },
  { id: 2, title: "Purchase Order Created", module: "Procurement", time: "1 hour ago", icon: ShoppingCart, color: "text-amber-500", bg: "bg-amber-50" },
  { id: 3, title: "Inventory Updated (Warehouse B)", module: "Inventory", time: "2 hours ago", icon: Boxes, color: "text-blue-500", bg: "bg-blue-50" },
  { id: 4, title: "Quality Inspection Passed", module: "Quality", time: "3 hours ago", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
  { id: 5, title: "Shipment Dispatched (ID: 492)", module: "Sales", time: "4 hours ago", icon: Truck, color: "text-purple-500", bg: "bg-purple-50" },
  { id: 6, title: "Employee Added", module: "HR", time: "Yesterday", icon: UserPlus, color: "text-slate-500", bg: "bg-slate-50" },
];

export function ActivityTimeline() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="mb-6">
        <h3 className="text-[15px] font-semibold text-slate-900 tracking-tight">Recent Enterprise Activity</h3>
      </div>
      
      <div className="relative pl-3">
        {/* Vertical line connecting timeline */}
        <div className="absolute top-2 bottom-2 left-[27px] w-[2px] bg-slate-100"></div>
        
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="relative flex items-start gap-4">
              <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${activity.bg} border border-white ring-4 ring-white`}>
                <activity.icon className={`h-4 w-4 ${activity.color}`} strokeWidth={2} />
              </div>
              <div className="flex flex-col flex-1 pb-1">
                <div className="flex items-center justify-between">
                  <p className="text-[14px] font-medium text-slate-800">{activity.title}</p>
                  <span className="text-[12px] text-slate-400">{activity.time}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                    {activity.module}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
