/**
 * Role entity types
 * Represents roles and permissions in the system
 */

export type PermissionAction = "read" | "create" | "edit" | "delete" | "export";

export type PermissionModule =
  | "casos"
  | "users"
  | "publicaciones"
  | "estadisticas"
  | "roles"
  | "sedes"
  | "dependencias";

export interface Permission {
  module: PermissionModule;
  actions: PermissionAction[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
  /**
   * Permissions structure:
   * {
   *   "users": ["read", "create", "edit", "delete"],
   *   "workers": ["read", "edit"],
   *   ...
   * }
   */
  permissions: Record<string, PermissionAction[]>;
  /**
   * System roles (admin, supervisor, operator) cannot be deleted
   */
  isSystem: boolean;
  /**
   * Number of users assigned to this role
   */
  usersCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoleDTO {
  name: string;
  description: string;
  permissions: Record<string, PermissionAction[]>;
}

export interface UpdateRoleDTO {
  name?: string;
  description?: string;
  permissions?: Record<string, PermissionAction[]>;
}

/**
 * Available permissions by module
 */
export const AVAILABLE_PERMISSIONS: Record<PermissionModule, PermissionAction[]> = {
  casos: ["read", "create", "edit", "delete", "export"],
  users: ["read", "create", "edit", "delete"],
  publicaciones: ["read", "create", "edit", "delete"],
  estadisticas: ["read", "export"],
  roles: ["read", "create", "edit", "delete"],
  sedes: ["read", "create", "edit", "delete"],
  dependencias: ["read", "create", "edit", "delete"],
};

/**
 * Module labels for UI
 */
export const MODULE_LABELS: Record<PermissionModule, string> = {
  casos: "Casos SRQD (Reclamos, Quejas, Denuncias)",
  users: "Usuarios del Sistema",
  publicaciones: "Publicaciones y Anuncios",
  estadisticas: "Estadísticas y Reportes",
  roles: "Roles y Privilegios",
  sedes: "Sedes",
  dependencias: "Dependencias",
};

/**
 * Action labels for UI
 */
export const ACTION_LABELS: Record<PermissionAction, string> = {
  read: "Ver",
  create: "Crear",
  edit: "Editar",
  delete: "Eliminar",
  export: "Exportar",
};
