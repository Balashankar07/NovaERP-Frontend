import { api } from "@/lib/api-helper";
import { API_ENDPOINTS } from "@/api/endpoints";
import type { Role, CreateRoleRequest, UpdateRoleRequest } from "@/types";

/**
 * Role API service — consumes backend Role endpoints.
 */
export const roleApi = {
  /**
   * GET /api/Role
   */
  getAll: (): Promise<Role[]> => 
    api.get<Role[]>(API_ENDPOINTS.ROLE.BASE),

  /**
   * GET /api/Role/{id}
   */
  getById: (id: string): Promise<Role> => 
    api.get<Role>(API_ENDPOINTS.ROLE.BY_ID(id)),

  /**
   * POST /api/Role
   */
  create: (data: CreateRoleRequest): Promise<Role> => 
    api.post<Role>(API_ENDPOINTS.ROLE.BASE, data),

  /**
   * PUT /api/Role/{id}
   */
  update: (id: string, data: UpdateRoleRequest): Promise<void> => 
    api.put<void>(API_ENDPOINTS.ROLE.BY_ID(id), data),

  /**
   * DELETE /api/Role/{id}
   */
  delete: (id: string): Promise<void> => 
    api.delete<void>(API_ENDPOINTS.ROLE.BY_ID(id)),
};
