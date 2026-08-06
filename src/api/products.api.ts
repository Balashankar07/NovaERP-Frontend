import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "./endpoints";
import { PaginatedResponse, ApiResponse } from "@/types";
import { ProductDto, CreateProductDto, UpdateProductDto } from "@/types/products.types";

export const productsApi = {
  getAll: async (
    pageNumber: number = 1,
    pageSize: number = 10,
    search?: string,
    sortBy?: string,
    sortOrder?: "asc" | "desc"
  ) => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<ProductDto>>>(
      API_ENDPOINTS.PRODUCTS.BASE,
      {
        params: { pageNumber, pageSize, search, sortBy, sortOrder },
      }
    );
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<ProductDto>>(
      API_ENDPOINTS.PRODUCTS.BY_ID(id)
    );
    return response.data;
  },

  create: async (data: CreateProductDto) => {
    const response = await apiClient.post<ApiResponse<ProductDto>>(
      API_ENDPOINTS.PRODUCTS.BASE,
      data
    );
    return response.data;
  },

  update: async (id: string, data: UpdateProductDto) => {
    const response = await apiClient.put<ApiResponse<ProductDto>>(
      API_ENDPOINTS.PRODUCTS.BY_ID(id),
      data
    );
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(API_ENDPOINTS.PRODUCTS.BY_ID(id));
  },
};
