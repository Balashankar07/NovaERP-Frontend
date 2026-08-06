import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/routes";
import {
  LayoutDashboard,
  Building2,
  Factory,
  Boxes,
  Warehouse,
  ShoppingCart,
  TrendingUp,
  CircleDollarSign,
  Users,
  ShieldCheck,
  FileBarChart,
  BrainCircuit,
  ShieldAlert,
  Settings,
  Cpu
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const sidebarNavItems = [
  { title: "Dashboard", href: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { title: "Company", href: "/company", icon: Building2 },
  { title: "Brands", href: ROUTES.BRANDS, icon: Boxes }, // Reusing Boxes or another icon
  { title: "Categories", href: ROUTES.CATEGORIES, icon: Boxes }, // Using Boxes for now
  { title: "Units", href: ROUTES.UNITS, icon: Boxes },
  { title: "Production", href: "/production", icon: Factory },
  { title: "Inventory", href: "/inventory", icon: Boxes },
  { title: "Warehouse", href: "/warehouse", icon: Warehouse },
  { title: "Procurement", href: "/procurement", icon: ShoppingCart },
  { title: "Sales", href: "/sales", icon: TrendingUp },
  { title: "Finance", href: "/finance", icon: CircleDollarSign },
  { title: "HR", href: "/hr", icon: Users },
  { title: "Quality Control", href: "/quality", icon: ShieldCheck },
  { title: "Reports", href: "/reports", icon: FileBarChart },
  { title: "AI Insights", href: "/ai-insights", icon: BrainCircuit },
  { title: "Administration", href: "/admin", icon: ShieldAlert },
  { title: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <nav className="relative hidden h-full w-64 flex-col border-r border-slate-800 bg-[#0B1020] md:flex">
      {/* Branding */}
      <div className="flex h-[60px] items-center px-6">
        <Link to={ROUTES.DASHBOARD} className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-sm border border-indigo-500/50">
            <Cpu className="h-4 w-4 text-white" strokeWidth={2} />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">NovaERP</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 py-4">
        <ul className="grid gap-1 px-4">
          {sidebarNavItems.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(`${item.href}/`));
            
            return (
              <li key={item.title}>
                <Link
                  to={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-all duration-200",
                    isActive
                      ? "bg-indigo-500/10 text-indigo-400 relative before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-1 before:rounded-r-full before:bg-indigo-500"
                      : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                  )}
                >
                  <item.icon className={cn(
                    "h-[18px] w-[18px] transition-colors duration-200",
                    isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"
                  )} strokeWidth={2} />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
      
      {/* Sidebar Footer User Info */}
      <div className="p-4 border-t border-white/[0.05]">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
            <span className="text-xs font-bold text-indigo-300">SA</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-medium text-slate-200 leading-tight">System Admin</span>
            <span className="text-[11px] text-emerald-400 font-medium">● Online</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
