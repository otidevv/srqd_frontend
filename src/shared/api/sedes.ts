/**
 * Sedes API Service
 * Handles sede (campus) management operations
 */

import { apiClient, type ApiResponse } from './client';
import type { Sede, CreateSedeDTO, UpdateSedeDTO } from "@/entities/sede";

class SedesApi {
  /**
   * Get all sedes
   */
  async getSedes(): Promise<Sede[]> {
    const response = await apiClient.get<ApiResponse<Sede[]>>('/sedes');
    return response.data;
  }

  /**
   * Get sede by ID
   */
  async getSedeById(id: string): Promise<Sede | null> {
    try {
      const response = await apiClient.get<ApiResponse<Sede>>(`/sedes/${id}`);
      return response.data;
    } catch {
      return null;
    }
  }

  /**
   * Create new sede
   */
  async createSede(data: CreateSedeDTO): Promise<Sede> {
    const response = await apiClient.post<ApiResponse<Sede>>('/sedes', data);
    return response.data;
  }

  /**
   * Update sede
   */
  async updateSede(id: string, data: UpdateSedeDTO): Promise<Sede> {
    const response = await apiClient.patch<ApiResponse<Sede>>(`/sedes/${id}`, data);
    return response.data;
  }

  /**
   * Delete sede
   */
  async deleteSede(id: string): Promise<void> {
    await apiClient.delete<ApiResponse>(`/sedes/${id}`);
  }
}

export const sedesApi = new SedesApi();

// Named exports for backward compatibility
export const {
  getSedes,
  getSedeById,
  createSede,
  updateSede,
  deleteSede,
} = sedesApi;
