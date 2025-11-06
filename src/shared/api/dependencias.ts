/**
 * Dependencias API Service
 * Handles dependencia (department) management operations
 */

import { apiClient, type ApiResponse } from './client';
import type { Dependencia, CreateDependenciaDTO, UpdateDependenciaDTO } from "@/entities/dependencia";

class DependenciasApi {
  /**
   * Get all dependencias with optional filters
   */
  async getDependencias(sedeId?: string, busqueda?: string): Promise<Dependencia[]> {
    const params: Record<string, string> = {};
    if (sedeId) params.sedeId = sedeId;
    if (busqueda) params.busqueda = busqueda;

    const response = await apiClient.get<ApiResponse<Dependencia[]>>('/dependencias', params);
    return response.data;
  }

  /**
   * Get dependencias by sede
   */
  async getDependenciasBySede(sedeId: string): Promise<Dependencia[]> {
    const response = await apiClient.get<ApiResponse<Dependencia[]>>(`/dependencias/sede/${sedeId}`);
    return response.data;
  }

  /**
   * Get dependencia by ID
   */
  async getDependenciaById(id: string): Promise<Dependencia | null> {
    try {
      const response = await apiClient.get<ApiResponse<Dependencia>>(`/dependencias/${id}`);
      return response.data;
    } catch {
      return null;
    }
  }

  /**
   * Create new dependencia
   */
  async createDependencia(data: CreateDependenciaDTO): Promise<Dependencia> {
    const response = await apiClient.post<ApiResponse<Dependencia>>('/dependencias', data);
    return response.data;
  }

  /**
   * Update dependencia
   */
  async updateDependencia(id: string, data: UpdateDependenciaDTO): Promise<Dependencia> {
    const response = await apiClient.patch<ApiResponse<Dependencia>>(`/dependencias/${id}`, data);
    return response.data;
  }

  /**
   * Delete dependencia
   */
  async deleteDependencia(id: string): Promise<void> {
    await apiClient.delete<ApiResponse>(`/dependencias/${id}`);
  }
}

export const dependenciasApi = new DependenciasApi();

// Named exports for backward compatibility
export const {
  getDependencias,
  getDependenciasBySede,
  getDependenciaById,
  createDependencia,
  updateDependencia,
  deleteDependencia,
} = dependenciasApi;
