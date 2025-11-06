/**
 * Roles API Service
 * Handles role management operations
 */

import { apiClient, type ApiResponse } from './client';
import type { Role, CreateRoleDTO, UpdateRoleDTO } from "@/entities/role";

class RolesApi {
  /**
   * Get all roles
   */
  async getRoles(): Promise<Role[]> {
    const response = await apiClient.get<ApiResponse<Role[]>>('/roles');
    return response.data;
  }

  /**
   * Get role by ID
   */
  async getRoleById(id: string): Promise<Role | null> {
    try {
      const response = await apiClient.get<ApiResponse<Role>>(`/roles/${id}`);
      return response.data;
    } catch {
      return null;
    }
  }

  /**
   * Create new role
   */
  async createRole(data: CreateRoleDTO): Promise<Role> {
    const response = await apiClient.post<ApiResponse<Role>>('/roles', data);
    return response.data;
  }

  /**
   * Update role
   */
  async updateRole(id: string, data: UpdateRoleDTO): Promise<Role> {
    const response = await apiClient.patch<ApiResponse<Role>>(`/roles/${id}`, data);
    return response.data;
  }

  /**
   * Delete role
   */
  async deleteRole(id: string): Promise<void> {
    await apiClient.delete<ApiResponse>(`/roles/${id}`);
  }
}

export const rolesApi = new RolesApi();

// Named exports for backward compatibility
export const {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} = rolesApi;
