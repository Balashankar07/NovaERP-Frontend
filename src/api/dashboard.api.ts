import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "./endpoints";
import { 
  DashboardSummaryDto, 
  InventoryReportDto, 
  ProductionReportDto, 
  SalesReportDto, 
  WarrantyReportDto, 
  AuditReportDto 
} from "@/types/reports.types";
import { ApiResponse, PaginatedResponse, PaginationParams } from "@/types/api.types";

export const dashboardApi = {
  getSummary: async () => {
    const response = await apiClient.get<ApiResponse<DashboardSummaryDto>>(
      API_ENDPOINTS.REPORTS.DASHBOARD
    );
    return response.data;
  },

  getInventoryReport: async (params?: PaginationParams) => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<InventoryReportDto>>>(
      API_ENDPOINTS.REPORTS.INVENTORY,
      { params }
    );
    return response.data;
  },

  getProductionReport: async (params?: PaginationParams) => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<ProductionReportDto>>>(
      API_ENDPOINTS.REPORTS.PRODUCTION,
      { params }
    );
    return response.data;
  },

  getSalesReport: async (params?: PaginationParams) => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<SalesReportDto>>>(
      API_ENDPOINTS.REPORTS.SALES,
      { params }
    );
    return response.data;
  },

  getWarrantyReport: async (params?: PaginationParams) => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<WarrantyReportDto>>>(
      API_ENDPOINTS.REPORTS.WARRANTY,
      { params }
    );
    return response.data;
  },

  getAuditReport: async (params?: PaginationParams) => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<AuditReportDto>>>(
      API_ENDPOINTS.REPORTS.AUDIT,
      { params }
    );
    return response.data;
  },
};
