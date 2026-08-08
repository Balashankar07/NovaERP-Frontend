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

      if (summaryRes.status === "fulfilled" && summaryRes.value) {
        // Summary shouldn't realistically be "empty" in a statistical sense if it returns an object,
        // but we assume success if data exists.
        setSummary({ data: summaryRes.value, status: "success" });
      } else {
        setSummary({ data: null, status: "error" });
      }

      if (auditRes.status === "fulfilled" && auditRes.value) {
        setAudit({ 
          data: auditRes.value.items, 
          status: auditRes.value.items.length > 0 ? "success" : "empty" 
        });
      } else {
        setAudit({ data: null, status: "error" });
      }

      if (prodRes.status === "fulfilled" && prodRes.value) {
        setProduction({ 
          data: prodRes.value.items, 
          status: prodRes.value.items.length > 0 ? "success" : "empty" 
        });
      } else {
        setProduction({ data: null, status: "error" });
      }

      if (invRes.status === "fulfilled" && invRes.value) {
        setInventory({ 
          data: invRes.value.items, 
          status: invRes.value.items.length > 0 ? "success" : "empty" 
        });
      } else {
        setInventory({ data: null, status: "error" });
      }
    };

    fetchData();
  }, []);

  return { summary, audit, production, inventory };
}
