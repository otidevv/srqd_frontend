/**
 * Users API Service
 * Handles user management operations
 */

import { apiClient, type ApiResponse } from './client';
import type { User, CreateUserDTO, UpdateUserDTO, UpdateProfileDTO, ChangePasswordDTO } from "@/entities/user";

class UsersApi {
  /**
   * Get all users
   */
  async getUsers(): Promise<User[]> {
    const response = await apiClient.get<ApiResponse<User[]>>('/users');
    // Convert backend status enum (uppercase) to frontend format (lowercase)
    return response.data.map(user => ({
      ...user,
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
      // Convert backend status enum (uppercase) to frontend format (lowercase)
      return {
        ...user,
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
    // Convert frontend status (lowercase) to backend format (uppercase)
    const backendData = {
      ...data,
      status: data.status?.toUpperCase() as any,
    };

    const response = await apiClient.post<ApiResponse<User>>('/users', backendData);

    // Convert backend status (uppercase) to frontend format (lowercase)
    const user = response.data;
    return {
      ...user,
      status: user.status.toLowerCase() as any,
    };
  }

  /**
   * Update user
   */
  async updateUser(id: string, data: UpdateUserDTO): Promise<User> {
    // Convert frontend status (lowercase) to backend format (uppercase)
    const backendData = {
      ...data,
      status: data.status?.toUpperCase() as any,
    };

    const response = await apiClient.patch<ApiResponse<User>>(`/users/${id}`, backendData);

    // Convert backend status (uppercase) to frontend format (lowercase)
    const user = response.data;
    return {
      ...user,
      status: user.status.toLowerCase() as any,
    };
  }

  /**
   * Delete user
   */
  async deleteUser(id: string): Promise<void> {
    await apiClient.delete<ApiResponse>(`/users/${id}`);
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>('/users/profile');
    const user = response.data;
    return {
      ...user,
      status: user.status.toLowerCase() as any,
    };
  }

  /**
   * Update current user profile
   */
  async updateProfile(data: UpdateProfileDTO): Promise<User> {
    const response = await apiClient.patch<ApiResponse<User>>('/users/profile', data);
    const user = response.data;
    return {
      ...user,
      status: user.status.toLowerCase() as any,
    };
  }

  /**
   * Change current user password
   */
  async changePassword(data: ChangePasswordDTO): Promise<void> {
    await apiClient.post<ApiResponse>('/users/change-password', data);
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
  getProfile,
  updateProfile,
  changePassword,
} = usersApi;
