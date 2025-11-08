import { useNavigate } from "react-router-dom";
import { IconLock, IconHome } from "@tabler/icons-react";
import { Button } from "@/shared/ui";

export function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="rounded-lg border bg-white p-8 shadow-lg">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-red-100 p-4">
              <IconLock className="size-12 text-red-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">
            Acceso Denegado
          </h1>

          {/* Description */}
          <p className="mb-6 text-center text-gray-600">
            No tienes los permisos necesarios para acceder a esta página.
            Si crees que esto es un error, contacta al administrador del sistema.
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => navigate("/dashboard")}
              className="w-full"
            >
              <IconHome className="mr-2 size-4" />
              Volver al Dashboard
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="w-full"
            >
              Volver Atrás
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 rounded-md bg-gray-50 p-4">
            <p className="text-xs text-gray-500">
              <strong>Nota:</strong> Los permisos son asignados por roles.
              Si necesitas acceso a esta sección, solicita los permisos
              correspondientes a tu administrador de sistema.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
