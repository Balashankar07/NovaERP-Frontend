import { api } from "@/lib/api-helper";
import { API_ENDPOINTS } from "@/api/endpoints";
import type { LoginRequest, LoginResponse, CurrentUser } from "@/types";

/**
 * Auth API service — consumes backend Authentication endpoints.
 */
export const authApi = {
  /**
   * POST /api/Auth/login
   * Authenticates user and returns JWT token.
   */
  login: (data: LoginRequest): Promise<LoginResponse> => 
    api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data),

  /**
   * GET /api/Auth/me
   * Returns current authenticated user info from JWT claims.
   */
  getMe: (): Promise<CurrentUser> => 
    api.get<CurrentUser>(API_ENDPOINTS.AUTH.ME),
};
