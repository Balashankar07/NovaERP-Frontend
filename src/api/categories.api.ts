import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "./endpoints";
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from "@/types/categories.types";
import { PaginatedResponse, PaginationParams, ApiResponse } from "@/types/api.types";

export const categoriesApi = {
  /**
   * Retrieves a paginated list of categories based on search, sorting, and pagination parameters.
   */
  getAll: async (params: PaginationParams & { sortBy?: string, sortOrder?: string }) => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<CategoryDto>>>(
      API_ENDPOINTS.CATEGORIES.BASE,
      { params }
    );
    return response.data;
  },

  /**
   * Retrieves a single category by its unique identifier.
   */
  getById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<CategoryDto>>(
      API_ENDPOINTS.CATEGORIES.BY_ID(id)
    );
    return response.data;
  },

  /**
   * Creates a new category.
   */
  create: async (data: CreateCategoryDto) => {
    const response = await apiClient.post<ApiResponse<CategoryDto>>(
      API_ENDPOINTS.CATEGORIES.BASE,
      data
    );
    return response.data;
  },

  /**
   * Updates an existing category by its unique identifier.
   */
  update: async (id: string, data: UpdateCategoryDto) => {
    const response = await apiClient.put<ApiResponse<CategoryDto>>(
      API_ENDPOINTS.CATEGORIES.BY_ID(id),
      data
    );
    return response.data;
  },

  /**
   * Deletes a category by its unique identifier.
   */
  delete: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<boolean>>(
      API_ENDPOINTS.CATEGORIES.BY_ID(id)
    );
    return response.data;
  },
};
