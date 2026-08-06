import { Bell, Search, LogOut, User, Settings, Sparkles, Moon } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const { user, logout } = useAuth();

  const getInitials = (name?: string) => {
    if (!name) return "SA";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
  };

  return (
    <header className="sticky top-0 z-40 flex h-[60px] w-full items-center justify-between border-b border-slate-200 bg-white px-6">
      
      {/* Left section: Global Search & Context */}
      <div className="flex w-full max-w-xl items-center gap-6">
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-[13px] font-semibold text-slate-800 tracking-tight">Nova Electronics</span>
          <span className="text-slate-300">/</span>
          <span className="text-[13px] font-medium text-slate-500">Global HQ</span>
        </div>

        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" strokeWidth={2} />
          <Input
            type="search"
            placeholder="Search products, orders, or employees (Press '/' to focus)"
            className="h-9 w-full rounded-md border border-slate-200 bg-slate-50/50 pl-9 pr-4 shadow-none focus-visible:ring-2 focus-visible:ring-indigo-600/20 focus-visible:border-indigo-600 transition-all text-[13px] placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right section: Actions */}
      <div className="flex items-center gap-2.5">
        <Button variant="outline" size="sm" className="hidden lg:flex h-9 gap-2 text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 transition-colors">
          <Sparkles className="h-4 w-4" strokeWidth={2} />
          <span className="text-[13px] font-medium">Ask AI</span>
        </Button>

        <div className="h-4 w-[1px] bg-slate-200 mx-1 hidden lg:block" />

        <Button variant="ghost" size="icon" className="relative h-9 w-9 text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-full">
          <Moon className="h-[18px] w-[18px]" strokeWidth={2} />
        </Button>

        <Button variant="ghost" size="icon" className="relative h-9 w-9 text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-full">
          <Settings className="h-[18px] w-[18px]" strokeWidth={2} />
        </Button>

        <Button variant="ghost" size="icon" className="relative h-9 w-9 text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-full">
          <Bell className="h-[18px] w-[18px]" strokeWidth={2} />
          <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </Button>

        <div className="h-4 w-[1px] bg-slate-200 mx-1" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full ml-1">
              <Avatar className="h-9 w-9 border border-slate-200 shadow-sm">
                <AvatarImage src="" alt={user?.userName} />
                <AvatarFallback className="bg-indigo-50 text-indigo-700 text-xs font-semibold">
                  {getInitials(user?.userName)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal p-3">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold text-slate-900 leading-none">{user?.userName || "System Administrator"}</p>
                <p className="text-[11px] leading-none text-slate-500 mt-1.5">
                  {user?.role || "Super Admin"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem className="text-[13px] text-slate-700 cursor-pointer">
              <User className="mr-2 h-4 w-4 text-slate-400" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-[13px] text-slate-700 cursor-pointer">
              <Settings className="mr-2 h-4 w-4 text-slate-400" />
              <span>Preferences</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem onClick={logout} className="text-[13px] text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
