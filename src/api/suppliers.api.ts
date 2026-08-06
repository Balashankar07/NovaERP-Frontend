import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "./endpoints";
import { PaginatedResponse, ApiResponse } from "@/types";
import { SupplierDto, CreateSupplierDto, UpdateSupplierDto } from "@/types/suppliers.types";

export const suppliersApi = {
  getAll: async (
    pageNumber: number = 1,
    pageSize: number = 10,
    search?: string,
    sortBy?: string,
    sortOrder?: "asc" | "desc"
  ) => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<SupplierDto>>>(
      API_ENDPOINTS.SUPPLIERS.BASE,
      {
        params: { pageNumber, pageSize, search, sortBy, sortOrder },
      }
    );
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<SupplierDto>>(
      API_ENDPOINTS.SUPPLIERS.BY_ID(id)
    );
    return response.data;
  },

  create: async (data: CreateSupplierDto) => {
    const response = await apiClient.post<ApiResponse<SupplierDto>>(
      API_ENDPOINTS.SUPPLIERS.BASE,
      data
    );
    return response.data;
  },

  update: async (id: string, data: UpdateSupplierDto) => {
    const response = await apiClient.put<ApiResponse<SupplierDto>>(
      API_ENDPOINTS.SUPPLIERS.BY_ID(id),
      data
    );
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(API_ENDPOINTS.SUPPLIERS.BY_ID(id));
  },
};
