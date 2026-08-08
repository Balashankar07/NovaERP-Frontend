import { api } from "@/lib/api-helper";
import { API_ENDPOINTS } from "@/api/endpoints";
import type { User, CreateUserRequest, UpdateUserRequest } from "@/types";

/**
 * User API service — consumes backend User endpoints.
 */
export const userApi = {
  /**
   * GET /api/User
   */
  getAll: (): Promise<User[]> => 
    api.get<User[]>(API_ENDPOINTS.USER.BASE),

  /**
   * GET /api/User/{id}
   */
  getById: (id: string): Promise<User> => 
    api.get<User>(API_ENDPOINTS.USER.BY_ID(id)),

  /**
   * POST /api/User
   */
  create: (data: CreateUserRequest): Promise<User> => 
    api.post<User>(API_ENDPOINTS.USER.BASE, data),

  /**
   * PUT /api/User/{id}
   */
  update: (id: string, data: UpdateUserRequest): Promise<void> => 
    api.put<void>(API_ENDPOINTS.USER.BY_ID(id), data),

  /**
   * DELETE /api/User/{id}
   */
  delete: (id: string): Promise<void> => 
    api.delete<void>(API_ENDPOINTS.USER.BY_ID(id)),
};
