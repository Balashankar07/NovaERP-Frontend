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
  { title: "Dashboard", href: ROUTES.DASHBOARD, icon: LayoutDashboard, permission: "Permissions.Dashboard.View" },
  { title: "Products", href: ROUTES.PRODUCTS, icon: Boxes, permission: "Permissions.Products.View" },
  { title: "Brands", href: ROUTES.BRANDS, icon: Boxes, permission: "Permissions.Brands.View" },
  { title: "Categories", href: ROUTES.CATEGORIES, icon: Boxes, permission: "Permissions.ProductCategories.View" },
  { title: "Units", href: ROUTES.UNITS, icon: Boxes, permission: "Permissions.Units.View" },
  { title: "Production", href: "/production", icon: Factory, permission: "Permissions.ProductionOrders.View" },
  { title: "Inventory", href: "/inventory", icon: Boxes, permission: "Permissions.Inventory.View" },
  { title: "Warehouse", href: "/warehouse", icon: Warehouse, permission: "Permissions.Warehouses.View" },
  { title: "Suppliers", href: ROUTES.SUPPLIERS, icon: Building2, permission: "Permissions.Suppliers.View" },
  { title: "Procurement", href: "/procurement", icon: ShoppingCart, permission: "Permissions.PurchaseOrders.View" },
  { title: "Sales", href: "/sales", icon: TrendingUp, permission: "Permissions.SalesOrders.View" },
  { title: "Finance", href: "/finance", icon: CircleDollarSign, permission: "Permissions.Reports.View" },
  { title: "HR", href: "/hr", icon: Users, permission: "Permissions.Users.View" },
  { title: "Quality Control", href: "/quality", icon: ShieldCheck, permission: "Permissions.QualityInspection.View" },
  { title: "Reports", href: "/reports", icon: FileBarChart, permission: "Permissions.Reports.View" },
  { title: "AI Insights", href: "/ai-insights", icon: BrainCircuit, permission: "Permissions.Dashboard.View" },
  { title: "Administration", href: "/admin", icon: ShieldAlert, permission: "Permissions.Roles.View" },
  { title: "Settings", href: "/settings", icon: Settings, permission: "Permissions.Users.View" },
];

import { usePermissions, getDefaultRouteForUser } from "@/hooks/use-permissions";
import { useAuth } from "@/hooks/use-auth";

export function Sidebar() {
  const location = useLocation();
  const { hasPermission } = usePermissions();
  const { user } = useAuth();
  
  // Calculate initials from email or a name property if it existed (fallback to U)
  const userInitials = user?.email ? user.email.substring(0, 2).toUpperCase() : "U";

  return (
    <nav className="relative hidden h-full w-64 flex-col border-r border-slate-800 bg-[#0B1020] md:flex">
      {/* Branding */}
      <div className="flex h-[60px] items-center px-6">
        <Link to={getDefaultRouteForUser(user)} className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 shadow-sm border border-indigo-500/50">
            <Cpu className="h-4 w-4 text-white" strokeWidth={2} />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">NovaERP</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 min-h-0 py-4">
        <ul className="grid gap-1 px-4">
          {sidebarNavItems.map((item) => {
            if (!hasPermission(item.permission)) return null;

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
          <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 shrink-0">
            <span className="text-xs font-bold text-indigo-300">{userInitials}</span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[13px] font-medium text-slate-200 leading-tight truncate" title={user?.email || "User"}>
              {user?.email || "User"}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-[11px] text-slate-400 font-medium truncate" title={user?.role || "Role"}>
                {user?.role || "Role"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
