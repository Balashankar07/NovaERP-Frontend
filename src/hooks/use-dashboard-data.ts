import { useState, useEffect } from "react";
import { dashboardApi } from "@/api/dashboard.api";
import { 
  DashboardSummaryDto, 
  AuditReportDto, 
  ProductionReportDto, 
  InventoryReportDto 
} from "@/types/reports.types";

export type WidgetStatus = "loading" | "success" | "error" | "empty";

export interface WidgetState<T> {
  data: T | null;
  status: WidgetStatus;
}

export function useDashboardData() {
  const [summary, setSummary] = useState<WidgetState<DashboardSummaryDto>>({ data: null, status: "loading" });
  const [audit, setAudit] = useState<WidgetState<AuditReportDto[]>>({ data: null, status: "loading" });
  const [production, setProduction] = useState<WidgetState<ProductionReportDto[]>>({ data: null, status: "loading" });
  const [inventory, setInventory] = useState<WidgetState<InventoryReportDto[]>>({ data: null, status: "loading" });

  useEffect(() => {
    const fetchData = async () => {
      const results = await Promise.allSettled([
        dashboardApi.getSummary(),
        dashboardApi.getAuditReport({ pageSize: 10 }),
        dashboardApi.getProductionReport({ pageSize: 10 }),
        dashboardApi.getInventoryReport({ pageSize: 10 })
      ]);

      const [summaryRes, auditRes, prodRes, invRes] = results;

      if (summaryRes.status === "fulfilled" && summaryRes.value.success) {
        // Summary shouldn't realistically be "empty" in a statistical sense if it returns an object,
        // but we assume success if data exists.
        setSummary({ data: summaryRes.value.data, status: "success" });
      } else {
        setSummary({ data: null, status: "error" });
      }

      if (auditRes.status === "fulfilled" && auditRes.value.success) {
        setAudit({ 
          data: auditRes.value.data.items, 
          status: auditRes.value.data.items.length > 0 ? "success" : "empty" 
        });
      } else {
        setAudit({ data: null, status: "error" });
      }

      if (prodRes.status === "fulfilled" && prodRes.value.success) {
        setProduction({ 
          data: prodRes.value.data.items, 
          status: prodRes.value.data.items.length > 0 ? "success" : "empty" 
        });
      } else {
        setProduction({ data: null, status: "error" });
      }

      if (invRes.status === "fulfilled" && invRes.value.success) {
        setInventory({ 
          data: invRes.value.data.items, 
          status: invRes.value.data.items.length > 0 ? "success" : "empty" 
        });
      } else {
        setInventory({ data: null, status: "error" });
      }
    };

    fetchData();
  }, []);

  return { summary, audit, production, inventory };
}
