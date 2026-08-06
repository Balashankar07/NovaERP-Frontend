import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { ScrollArea } from "@/components/ui/scroll-area";

export function DashboardLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white antialiased font-sans">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <ScrollArea className="flex-1 bg-[#F8FAFC]">
          <main className="flex-1 px-4 py-8 lg:px-10 lg:py-8 max-w-[1600px] mx-auto w-full">
            <Outlet />
          </main>
        </ScrollArea>
      </div>
    </div>
  );
}
