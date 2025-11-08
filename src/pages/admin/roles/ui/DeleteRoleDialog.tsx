import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
} from "@/shared/ui";
import { rolesApi } from "@/shared/api";
import { toast } from "sonner";
import type { Role } from "@/entities/role";
import { Loader2, AlertTriangle } from "lucide-react";

interface DeleteRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role | null;
  onSuccess?: () => void;
}

export function DeleteRoleDialog({ open, onOpenChange, role, onSuccess }: DeleteRoleDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!role) return;

    try {
      setIsDeleting(true);
      await rolesApi.deleteRole(role.id);
      toast.success("Rol eliminado exitosamente");
      onOpenChange(false);
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error al eliminar el rol");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-destructive" />
            Eliminar Rol
          </DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <p>
            ¿Estás seguro de que deseas eliminar el rol <strong>{role?.name}</strong>?
          </p>

          {role?.usersCount && role.usersCount > 0 && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-sm text-destructive font-medium">
                ⚠️ Hay {role.usersCount} usuario(s) asignado(s) a este rol
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Debes remover todos los usuarios antes de eliminar el rol
              </p>
            </div>
          )}

          {role?.isSystem && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-sm text-destructive font-medium">
                ⚠️ Este es un rol del sistema y no puede eliminarse
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isDeleting}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting || role?.isSystem || (role?.usersCount ?? 0) > 0}
          >
            {isDeleting ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                Eliminando...
              </>
            ) : (
              "Eliminar Rol"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
