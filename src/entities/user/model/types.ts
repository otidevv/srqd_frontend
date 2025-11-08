/**
 * User entity types
 * Represents a user in the SRQD system
 */

export type UserStatus = "active" | "inactive" | "suspended";

export type TipoDocumento = "DNI" | "CARNET_EXTRANJERIA" | "PASAPORTE";

export interface User {
  /** Unique user ID */
  id: string;
  /** User email */
  email: string;
  /** User full name */
  name: string;
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

  // Profile information
  /** Document type */
  tipoDocumento?: TipoDocumento;
  /** Document number */
  numeroDocumento?: string;
  /** Birth date */
  fechaNacimiento?: string;
  /** Address */
  direccion?: string;

  // Professional information
  /** Job position */
  cargo?: string;
  /** Sede ID */
  sedeId?: string;
  /** Dependencia ID */
  dependenciaId?: string;

  /** Role ID */
  roleId: string;
  /** Role relation */
  role: {
    id: string;
    name: string;
    permissions: Record<string, string[]>;
    isSystem: boolean;
  };
  /** Sede relation */
  sede?: {
    id: string;
    nombre: string;
  };
  /** Dependencia relation */
  dependencia?: {
    id: string;
    nombre: string;
  };
}

export interface CreateUserDTO {
  email: string;
  name: string;
  roleId: string;
  password: string;
  phone?: string;
  status?: UserStatus;

  // Profile information
  tipoDocumento?: TipoDocumento;
  numeroDocumento?: string;
  fechaNacimiento?: string;
  direccion?: string;

  // Professional information
  cargo?: string;
  sedeId?: string;
  dependenciaId?: string;
}

export interface UpdateUserDTO {
  email?: string;
  name?: string;
  roleId?: string;
  phone?: string;
  status?: UserStatus;
  password?: string;

  // Profile information
  tipoDocumento?: TipoDocumento;
  numeroDocumento?: string;
  fechaNacimiento?: string;
  direccion?: string;

  // Professional information
  cargo?: string;
  sedeId?: string;
  dependenciaId?: string;
}

export interface UpdateProfileDTO {
  name?: string;
  phone?: string;

  // Profile information
  tipoDocumento?: TipoDocumento;
  numeroDocumento?: string;
  fechaNacimiento?: string;
  direccion?: string;

  // Professional information
  cargo?: string;
  sedeId?: string;
  dependenciaId?: string;
}

export interface ChangePasswordDTO {
  oldPassword: string;
  newPassword: string;
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
