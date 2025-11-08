import { Navigate } from "react-router-dom";
import { useAuth } from "@/app/providers";
import { usePermissions, type PermissionModule, type PermissionAction } from "./usePermissions";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: {
    module: PermissionModule;
    action: PermissionAction;
  };
}

/**
 * ProtectedRoute component
 * Redirects to login if user is not authenticated
 * Redirects to unauthorized if user doesn't have required permission
 */
export function ProtectedRoute({ children, requiredPermission }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const { hasPermission } = usePermissions();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block size-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check permission if required
  if (requiredPermission) {
    const { module, action } = requiredPermission;
    if (!hasPermission(module, action)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
}
