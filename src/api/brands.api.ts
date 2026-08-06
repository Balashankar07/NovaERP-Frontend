import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "./endpoints";
import { ApiResponse, PaginatedResponse, PaginationParams } from "@/types/api.types";
import { BrandDto, CreateBrandDto, UpdateBrandDto } from "@/types/brands.types";

export const brandsApi = {
  /**
   * Get all brands with pagination, search, and sorting
   */
  getAll: async (params?: PaginationParams) => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<BrandDto>>>(
      API_ENDPOINTS.BRANDS.BASE,
      { params }
    );
    return response.data;
  },

  /**
   * Get a brand by ID
   */
  getById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<BrandDto>>(
      API_ENDPOINTS.BRANDS.BY_ID(id)
    );
    return response.data;
  },

  /**
   * Create a new brand
   */
  create: async (data: CreateBrandDto) => {
    const response = await apiClient.post<ApiResponse<BrandDto>>(
      API_ENDPOINTS.BRANDS.BASE,
      data
    );
    return response.data;
  },

  /**
   * Update an existing brand
   */
  update: async (id: string, data: UpdateBrandDto) => {
    const response = await apiClient.put<ApiResponse<BrandDto>>(
      API_ENDPOINTS.BRANDS.BY_ID(id),
      data
    );
    return response.data;
  },

  /**
   * Delete a brand
   */
  delete: async (id: string) => {
    const response = await apiClient.delete<void>(
      API_ENDPOINTS.BRANDS.BY_ID(id)
    );
    return response.data;
  },
};
