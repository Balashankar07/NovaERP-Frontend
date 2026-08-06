import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { EnterpriseKpiGrid } from "@/components/dashboard/EnterpriseKpiGrid";
import { ProductionOverview } from "@/components/dashboard/ProductionOverview";
import { InventoryPipeline } from "@/components/dashboard/InventoryPipeline";
import { AiInsightsCard } from "@/components/dashboard/AiInsightsCard";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { PerformanceMetrics } from "@/components/dashboard/PerformanceMetrics";
import { TasksPanel } from "@/components/dashboard/TasksPanel";
import { useDashboardData } from "@/hooks/use-dashboard-data";

export default function DashboardPage() {
  const { summary, audit, production, inventory } = useDashboardData();

  return (
    <div className="w-full flex flex-col gap-6">
      <WelcomeSection />
      
      <EnterpriseKpiGrid summary={summary} />

      {/* Main 12-column Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column (8 columns wide on desktop) */}
        <div className="md:col-span-12 xl:col-span-8 flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProductionOverview production={production} />
            <InventoryPipeline inventory={inventory} />
          </div>
          
          <PerformanceMetrics />
          <ActivityTimeline audit={audit} />
        </div>

        {/* Right Column (4 columns wide on desktop) */}
        <div className="md:col-span-12 xl:col-span-4 flex flex-col gap-6">
          <AiInsightsCard />
          <TasksPanel summary={summary} />
        </div>
        
      </div>
    </div>
  );
}
