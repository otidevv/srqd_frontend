/**
 * User entity types
 * Represents a user in the attendance system
 */

export type UserRole = "admin" | "supervisor" | "operator";

export type UserStatus = "active" | "inactive" | "suspended";

export interface User {
  /** Unique user ID */
  id: string;
  /** User email */
  email: string;
  /** User full name */
  name: string;
  /** User role */
  role: UserRole;
  /** User status */
  status: UserStatus;
  /** Phone number */
  phone?: string;
  /** Avatar URL */
  avatar?: string;
  /** Account creation date */
  createdAt: string;
  /** Last login date */
  lastLogin?: string;
  /** Last updated date */
  updatedAt?: string;
}

export interface CreateUserDTO {
  email: string;
  name: string;
  role: UserRole;
  password: string;
  phone?: string;
  status?: UserStatus;
}

export interface UpdateUserDTO {
  email?: string;
  name?: string;
  role?: UserRole;
  phone?: string;
  status?: UserStatus;
  password?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
