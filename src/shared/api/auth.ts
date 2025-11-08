/**
 * Authentication API Service
 * Handles login, logout, and authentication-related operations
 */

import { apiClient, type ApiResponse } from './client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  sedeId?: string;
}

export interface LoginResponse {
  success: boolean;
  user: AuthUser;
  token: string;
}

export interface PasswordResetResponse {
  success: boolean;
  message: string;
}

class AuthApi {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);

    // Save token and user to localStorage
    if (response.success && response.token) {
      apiClient.setAuthToken(response.token);
      localStorage.setItem('auth_user', JSON.stringify(response.user));
    }

    return response;
  }

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    apiClient.clearAuthToken();
    // Backend doesn't have a logout endpoint (JWT is stateless)
  }

  /**
   * Get current user from localStorage
   */
  getCurrentUser(): AuthUser | null {
    const userJson = localStorage.getItem('auth_user');
    if (!userJson) return null;

    try {
      return JSON.parse(userJson) as AuthUser;
    } catch {
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    const user = this.getCurrentUser();
    return !!token && !!user;
  }

  /**
   * Get current auth token
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Request password reset - sends email with reset link
   */
  async requestPasswordReset(email: string): Promise<PasswordResetResponse> {
    return await apiClient.post<PasswordResetResponse>('/auth/forgot-password', { email });
  }

  /**
   * Validate reset token
   */
  async validateResetToken(token: string): Promise<PasswordResetResponse> {
    return await apiClient.get<PasswordResetResponse>(`/auth/validate-reset-token/${token}`);
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, password: string): Promise<PasswordResetResponse> {
    return await apiClient.post<PasswordResetResponse>('/auth/reset-password', {
      token,
      password,
    });
  }
}

export const authApi = new AuthApi();
