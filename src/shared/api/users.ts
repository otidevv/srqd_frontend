/**
 * Users API Service
 * Handles user management operations
 */

import { apiClient, type ApiResponse } from './client';
import type { User, CreateUserDTO, UpdateUserDTO } from "@/entities/user";

class UsersApi {
  /**
   * Get all users
   */
  async getUsers(): Promise<User[]> {
    const response = await apiClient.get<ApiResponse<User[]>>('/users');
    // Convert backend enum values (uppercase) to frontend format (lowercase)
    return response.data.map(user => ({
      ...user,
      role: user.role.toLowerCase() as any,
      status: user.status.toLowerCase() as any,
    }));
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<User | null> {
    try {
      const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
      const user = response.data;
      // Convert backend enum values (uppercase) to frontend format (lowercase)
      return {
        ...user,
        role: user.role.toLowerCase() as any,
        status: user.status.toLowerCase() as any,
      };
    } catch {
      return null;
    }
  }

  /**
   * Create new user
   */
  async createUser(data: CreateUserDTO): Promise<User> {
    // Convert frontend enum values (lowercase) to backend format (uppercase)
    const backendData = {
      ...data,
      role: data.role?.toUpperCase() as any,
      status: data.status?.toUpperCase() as any,
    };

    const response = await apiClient.post<ApiResponse<User>>('/users', backendData);

    // Convert backend response (uppercase) to frontend format (lowercase)
    const user = response.data;
    return {
      ...user,
      role: user.role.toLowerCase() as any,
      status: user.status.toLowerCase() as any,
    };
  }

  /**
   * Update user
   */
  async updateUser(id: string, data: UpdateUserDTO): Promise<User> {
    // Convert frontend enum values (lowercase) to backend format (uppercase)
    const backendData = {
      ...data,
      role: data.role?.toUpperCase() as any,
      status: data.status?.toUpperCase() as any,
    };

    const response = await apiClient.patch<ApiResponse<User>>(`/users/${id}`, backendData);

    // Convert backend response (uppercase) to frontend format (lowercase)
    const user = response.data;
    return {
      ...user,
      role: user.role.toLowerCase() as any,
      status: user.status.toLowerCase() as any,
    };
  }

  /**
   * Delete user
   */
  async deleteUser(id: string): Promise<void> {
    await apiClient.delete<ApiResponse>(`/users/${id}`);
  }
}

export const usersApi = new UsersApi();

// Named exports for backward compatibility
export const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = usersApi;
