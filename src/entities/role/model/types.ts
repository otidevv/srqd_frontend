/**
 * Role entity types
 * Represents roles and permissions in the system
 */

export type PermissionAction = "read" | "create" | "edit" | "delete" | "export";

export type PermissionModule =
  | "users"
  | "workers"
  | "attendance"
  | "schedules"
  | "devices"
  | "reports"
  | "stats"
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
  users: ["read", "create", "edit", "delete"],
  workers: ["read", "create", "edit", "delete", "export"],
  attendance: ["read", "create", "edit", "delete", "export"],
  schedules: ["read", "create", "edit", "delete"],
  devices: ["read", "create", "edit", "delete"],
  reports: ["read", "create", "export"],
  stats: ["read"],
  roles: ["read", "create", "edit", "delete"],
  sedes: ["read", "create", "edit", "delete"],
  dependencias: ["read", "create", "edit", "delete"],
};

/**
 * Module labels for UI
 */
export const MODULE_LABELS: Record<PermissionModule, string> = {
  users: "Usuarios del Sistema",
  workers: "Trabajadores",
  attendance: "Asistencias",
  schedules: "Horarios",
  devices: "Dispositivos ZKTeco",
  reports: "Reportes",
  stats: "Estadísticas",
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
