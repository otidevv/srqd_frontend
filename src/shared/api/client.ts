/**
 * HTTP Client for API requests
 * Built with Axios for robust HTTP communication with the backend
 */

import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const BACKEND_BASE_URL = API_BASE_URL.replace('/api', '');

export interface ApiError {
  message: string;
  status: number;
  details?: unknown;
}

/**
 * Convierte una ruta relativa de archivo a URL completa del backend
 */
export function getFileUrl(relativePath: string | null | undefined): string | null {
  if (!relativePath) return null;
  if (relativePath.startsWith('http')) return relativePath;
  return `${BACKEND_BASE_URL}${relativePath}`;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  total?: number;
}

class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 30000, // 30 seconds timeout
    });

    // Request interceptor to add auth token and set Content-Type
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Only set Content-Type to application/json if not already set and not FormData
        if (!config.headers['Content-Type'] && !(config.data instanceof FormData)) {
          config.headers['Content-Type'] = 'application/json';
        }

        // Remove Content-Type for FormData to let browser set it with boundary
        if (config.data instanceof FormData) {
          delete config.headers['Content-Type'];
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const apiError: ApiError = {
          message: error.message || 'An error occurred',
          status: error.response?.status || 0,
          details: error.response?.data,
        };

        // Extract error message from backend response
        if (error.response?.data && typeof error.response.data === 'object') {
          const data = error.response.data as { message?: string; error?: string };
          apiError.message = data.message || data.error || apiError.message;
        }

        // Handle 401 Unauthorized - clear token and redirect to login
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
          // Only redirect if not already on login page
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
        }

        return Promise.reject(apiError);
      }
    );
  }

  setAuthToken(token: string) {
    localStorage.setItem('auth_token', token);
    this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  clearAuthToken() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    delete this.axiosInstance.defaults.headers.common['Authorization'];
  }

  async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    const response = await this.axiosInstance.get<T>(endpoint, { params });
    return response.data;
  }

  async post<T>(endpoint: string, data?: unknown, config?: any): Promise<T> {
    const response = await this.axiosInstance.post<T>(endpoint, data, config);
    return response.data;
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await this.axiosInstance.put<T>(endpoint, data);
    return response.data;
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await this.axiosInstance.patch<T>(endpoint, data);
    return response.data;
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.axiosInstance.delete<T>(endpoint);
    return response.data;
  }

  // Upload files with multipart/form-data
  async upload<T>(endpoint: string, formData: FormData): Promise<T> {
    const response = await this.axiosInstance.post<T>(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // Download file
  async download(endpoint: string, filename?: string): Promise<Blob> {
    const response = await this.axiosInstance.get(endpoint, {
      responseType: 'blob',
    });

    // Create download link if filename provided
    if (filename) {
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }

    return response.data;
  }

  // Get the axios instance for custom requests
  getInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

export const apiClient = new HttpClient(API_BASE_URL);
