import apiClient from "@/lib/axios";
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
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<any>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
    // Backend wraps response in ApiResponse<T> where T is LoginResponse
    return response.data.data;
  },

  /**
   * GET /api/Auth/me
   * Returns current authenticated user info from JWT claims.
   */
  getMe: async (): Promise<CurrentUser> => {
    const response = await apiClient.get<any>(API_ENDPOINTS.AUTH.ME);
    // Note: getMe backend doesn't wrap in ApiResponse, it just returns Ok(new { ... })
    return response.data;
  },
};
