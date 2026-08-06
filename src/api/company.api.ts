import apiClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/api/endpoints";
import type {
  Company,
  CreateCompanyRequest,
  UpdateCompanyRequest,
} from "@/types";

/**
 * Company API service — consumes backend Company endpoints.
 */
export const companyApi = {
  /**
   * GET /api/Company
   */
  getAll: async (): Promise<Company[]> => {
    const response = await apiClient.get<any>(
      API_ENDPOINTS.COMPANY.BASE
    );
    return response.data.data;
  },

  /**
   * GET /api/Company/{id}
   */
  getById: async (id: string): Promise<Company> => {
    const response = await apiClient.get<any>(
      API_ENDPOINTS.COMPANY.BY_ID(id)
    );
    return response.data.data;
  },

  /**
   * POST /api/Company
   */
  create: async (data: CreateCompanyRequest): Promise<Company> => {
    const response = await apiClient.post<any>(
      API_ENDPOINTS.COMPANY.BASE,
      data
    );
    return response.data.data;
  },

  /**
   * PUT /api/Company/{id}
   */
  update: async (id: string, data: UpdateCompanyRequest): Promise<Company> => {
    const response = await apiClient.put<any>(
      API_ENDPOINTS.COMPANY.BY_ID(id),
      data
    );
    return response.data.data;
  },

  /**
   * DELETE /api/Company/{id}
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.COMPANY.BY_ID(id));
  },
};
