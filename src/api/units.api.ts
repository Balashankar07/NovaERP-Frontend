import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "./endpoints";
import { UnitDto, CreateUnitDto, UpdateUnitDto } from "@/types/units.types";
import { PaginatedResponse, PaginationParams, ApiResponse } from "@/types/api.types";

export const unitsApi = {
  /**
   * Retrieves a paginated list of units based on search, sorting, and pagination parameters.
   */
  getAll: async (params: PaginationParams & { sortBy?: string, sortOrder?: string }) => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<UnitDto>>>(
      API_ENDPOINTS.UNITS.BASE,
      { params }
    );
    return response.data.data;
  },

  /**
   * Retrieves a single unit by its unique identifier.
   */
  getById: async (id: string) => {
    const response = await apiClient.get<ApiResponse<UnitDto>>(
      API_ENDPOINTS.UNITS.BY_ID(id)
    );
    return response.data.data;
  },

  /**
   * Creates a new unit.
   */
  create: async (data: CreateUnitDto) => {
    const response = await apiClient.post<ApiResponse<UnitDto>>(
      API_ENDPOINTS.UNITS.BASE,
      data
    );
    return response.data.data;
  },

  /**
   * Updates an existing unit by its unique identifier.
   */
  update: async (id: string, data: UpdateUnitDto) => {
    const response = await apiClient.put<ApiResponse<UnitDto>>(
      API_ENDPOINTS.UNITS.BY_ID(id),
      data
    );
    return response.data.data;
  },

  /**
   * Deletes a unit by its unique identifier.
   */
  delete: async (id: string) => {
    const response = await apiClient.delete<ApiResponse<boolean>>(
      API_ENDPOINTS.UNITS.BY_ID(id)
    );
    return response.data.data;
  },
};
