/**
 * Publicaciones API Client
 * Handles all publicaciones-related operations
 */

import { apiClient, type ApiResponse } from './client';
import type {
  Publicacion,
  CreatePublicacionData,
  UpdatePublicacionData,
} from '@/pages/admin/publicaciones/model/types';

class PublicacionesApi {
  /**
   * Obtener todas las publicaciones (Admin)
   */
  async getPublicaciones(): Promise<Publicacion[]> {
    const response = await apiClient.get<ApiResponse<Publicacion[]>>('/publicaciones');
    return this.convertPublicaciones(response.data);
  }

  /**
   * Obtener publicaciones activas (Público/Dashboard)
   */
  async getPublicacionesActivas(): Promise<Publicacion[]> {
    const response = await apiClient.get<ApiResponse<Publicacion[]>>('/publicaciones/activas');
    return this.convertPublicaciones(response.data);
  }

  /**
   * Obtener una publicación por ID
   */
  async getPublicacion(id: string): Promise<Publicacion> {
    const response = await apiClient.get<ApiResponse<Publicacion>>(`/publicaciones/${id}`);
    return this.convertPublicacion(response.data);
  }

  /**
   * Crear nueva publicación
   */
  async createPublicacion(data: CreatePublicacionData): Promise<Publicacion> {
    // Convertir tipo a uppercase para el backend
    const backendData = {
      ...data,
      tipo: data.tipo?.toUpperCase(),
    };

    const response = await apiClient.post<ApiResponse<Publicacion>>(
      '/publicaciones',
      backendData
    );
    return this.convertPublicacion(response.data);
  }

  /**
   * Actualizar publicación
   */
  async updatePublicacion(
    id: string,
    data: UpdatePublicacionData
  ): Promise<Publicacion> {
    // Convertir tipo a uppercase si existe
    const backendData = {
      ...data,
      tipo: data.tipo?.toUpperCase(),
    };

    const response = await apiClient.patch<ApiResponse<Publicacion>>(
      `/publicaciones/${id}`,
      backendData
    );
    return this.convertPublicacion(response.data);
  }

  /**
   * Activar/Desactivar publicación
   */
  async togglePublicacion(id: string): Promise<Publicacion> {
    const response = await apiClient.patch<ApiResponse<Publicacion>>(
      `/publicaciones/${id}/toggle`
    );
    return this.convertPublicacion(response.data);
  }

  /**
   * Eliminar publicación
   */
  async deletePublicacion(id: string): Promise<void> {
    await apiClient.delete(`/publicaciones/${id}`);
  }

  /**
   * Convertir tipos del backend (UPPERCASE) a frontend (lowercase)
   */
  private convertPublicacion(publicacion: any): Publicacion {
    return {
      ...publicacion,
      tipo: publicacion.tipo?.toLowerCase() as Publicacion['tipo'],
    };
  }

  /**
   * Convertir array de publicaciones
   */
  private convertPublicaciones(publicaciones: any[]): Publicacion[] {
    return publicaciones.map((p) => this.convertPublicacion(p));
  }
}

// Export singleton instance
export const publicacionesApi = new PublicacionesApi();

// Export named functions for backward compatibility
export const getPublicaciones = () => publicacionesApi.getPublicaciones();
export const getPublicacionesActivas = () =>
  publicacionesApi.getPublicacionesActivas();
export const getPublicacion = (id: string) => publicacionesApi.getPublicacion(id);
export const createPublicacion = (data: CreatePublicacionData) =>
  publicacionesApi.createPublicacion(data);
export const updatePublicacion = (id: string, data: UpdatePublicacionData) =>
  publicacionesApi.updatePublicacion(id, data);
export const togglePublicacion = (id: string) =>
  publicacionesApi.togglePublicacion(id);
export const deletePublicacion = (id: string) =>
  publicacionesApi.deletePublicacion(id);
