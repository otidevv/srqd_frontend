/**
 * Permissions Hook
 * Provides permission checking utilities based on user's role permissions
 */

import { useAuth } from "@/app/providers";

export type PermissionModule =
  | "casos"
  | "users"
  | "publicaciones"
  | "estadisticas"
  | "roles"
  | "sedes"
  | "dependencias";

export type PermissionAction =
  | "read"
  | "create"
  | "edit"
  | "delete"
  | "export";

export interface Permission {
  module: PermissionModule;
  action: PermissionAction;
}

export function usePermissions() {
  const { user } = useAuth();

  /**
   * Check if user has a specific permission
   * @param module - The module to check (e.g., "users", "casos")
   * @param action - The action to check (e.g., "read", "create", "edit", "delete")
   * @returns true if user has the permission, false otherwise
   */
  const hasPermission = (module: PermissionModule, action: PermissionAction): boolean => {
    if (!user || !user.role || !user.role.permissions) {
      return false;
    }

    const modulePermissions = user.role.permissions[module];

    if (!modulePermissions || !Array.isArray(modulePermissions)) {
      return false;
    }

    return modulePermissions.includes(action);
  };

  /**
   * Check if user can access a module (has at least read permission)
   * @param module - The module to check
   * @returns true if user has read permission for the module
   */
  const canAccessModule = (module: PermissionModule): boolean => {
    return hasPermission(module, "read");
  };

  /**
   * Check if user has any of the specified permissions
   * @param permissions - Array of permission objects to check
   * @returns true if user has at least one of the permissions
   */
  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(({ module, action }) => hasPermission(module, action));
  };

  /**
   * Check if user has all of the specified permissions
   * @param permissions - Array of permission objects to check
   * @returns true if user has all of the permissions
   */
  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(({ module, action }) => hasPermission(module, action));
  };

  /**
   * Get all permissions for a specific module
   * @param module - The module to get permissions for
   * @returns Array of actions user can perform on the module
   */
  const getModulePermissions = (module: PermissionModule): PermissionAction[] => {
    if (!user || !user.role || !user.role.permissions) {
      return [];
    }

    const modulePermissions = user.role.permissions[module];

    if (!modulePermissions || !Array.isArray(modulePermissions)) {
      return [];
    }

    return modulePermissions as PermissionAction[];
  };

  /**
   * Check if user has admin role (for backward compatibility)
   * Note: Prefer using specific permission checks instead
   */
  const isAdmin = (): boolean => {
    return user?.role?.name === "Administrador";
  };

  /**
   * Check if user can access any admin module
   * @returns true if user has access to at least one admin module
   */
  const canAccessAdmin = (): boolean => {
    return hasAnyPermission([
      { module: "users", action: "read" },
      { module: "roles", action: "read" },
      { module: "sedes", action: "read" },
      { module: "dependencias", action: "read" },
      { module: "publicaciones", action: "read" },
    ]);
  };

  return {
    hasPermission,
    canAccessModule,
    hasAnyPermission,
    hasAllPermissions,
    getModulePermissions,
    isAdmin,
    canAccessAdmin,
  };
}
