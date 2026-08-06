import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/api/endpoints";
import type { Role, CreateRoleRequest, UpdateRoleRequest } from "@/types";

/**
 * Role API service — consumes backend Role endpoints.
 */
export const roleApi = {
  /**
   * GET /api/Role
   */
  getAll: async (): Promise<Role[]> => {
    const response = await apiClient.get<any>(API_ENDPOINTS.ROLE.BASE);
    return response.data.data;
  },

  /**
   * GET /api/Role/{id}
   */
  getById: async (id: string): Promise<Role> => {
    const response = await apiClient.get<any>(
      API_ENDPOINTS.ROLE.BY_ID(id)
    );
    return response.data.data;
  },

  /**
   * POST /api/Role
   */
  create: async (data: CreateRoleRequest): Promise<Role> => {
    const response = await apiClient.post<any>(
      API_ENDPOINTS.ROLE.BASE,
      data
    );
    return response.data.data;
  },

  /**
   * PUT /api/Role/{id}
   */
  update: async (id: string, data: UpdateRoleRequest): Promise<void> => {
    await apiClient.put(API_ENDPOINTS.ROLE.BY_ID(id), data);
  },

  /**
   * DELETE /api/Role/{id}
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.ROLE.BY_ID(id));
  },
};
