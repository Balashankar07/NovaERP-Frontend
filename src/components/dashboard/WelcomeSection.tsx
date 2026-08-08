import { useAuth } from "@/hooks/use-auth";
import { Cpu } from "lucide-react";
import { useEffect, useState } from "react";

export function WelcomeSection() {
  const { user } = useAuth();
  const [time, setTime] = useState(new Date());

  const getDisplayName = (email?: string) => {
    if (!email) return "System Administrator";
    const namePart = email.split("@")[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const dateString = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
      <div>
        <h1 className="text-[1.75rem] font-bold text-slate-900 tracking-tight leading-tight">
          Good Morning,
          <br />
          {getDisplayName(user?.email)}
        </h1>
        <p className="text-slate-500 text-[15px] mt-2">
          Here's today's operational overview across your manufacturing enterprise.
        </p>
      </div>

      <div className="flex items-center gap-6 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0B1020] text-white shadow-sm border border-slate-800">
            <Cpu className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Global Time</div>
            <div className="text-lg font-bold text-slate-900 leading-none">{timeString}</div>
            <div className="text-[13px] text-slate-500 mt-1">{dateString}</div>
          </div>
        </div>
        
        <div className="w-[1px] h-12 bg-slate-200 mx-2 hidden sm:block"></div>
        
        <div className="hidden sm:flex flex-col justify-center">
          <div className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Plant Status</div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></span>
            <span className="text-[15px] font-semibold text-slate-900">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}
