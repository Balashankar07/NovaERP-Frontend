import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/api/endpoints";
import type { User, CreateUserRequest, UpdateUserRequest } from "@/types";

/**
 * User API service — consumes backend User endpoints.
 */
export const userApi = {
  /**
   * GET /api/User
   */
  getAll: async (): Promise<User[]> => {
    const response = await apiClient.get<any>(API_ENDPOINTS.USER.BASE);
    return response.data.data;
  },

  /**
   * GET /api/User/{id}
   */
  getById: async (id: string): Promise<User> => {
    const response = await apiClient.get<any>(
      API_ENDPOINTS.USER.BY_ID(id)
    );
    return response.data.data;
  },

  /**
   * POST /api/User
   */
  create: async (data: CreateUserRequest): Promise<User> => {
    const response = await apiClient.post<any>(
      API_ENDPOINTS.USER.BASE,
      data
    );
    return response.data.data;
  },

  /**
   * PUT /api/User/{id}
   */
  update: async (id: string, data: UpdateUserRequest): Promise<void> => {
    await apiClient.put(API_ENDPOINTS.USER.BY_ID(id), data);
  },

  /**
   * DELETE /api/User/{id}
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.USER.BY_ID(id));
  },
};
