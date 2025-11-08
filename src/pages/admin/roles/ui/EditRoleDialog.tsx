import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Label,
  Textarea,
} from "@/shared/ui";
import { PermissionsEditor } from "./PermissionsEditor";
import { rolesApi } from "@/shared/api";
import { toast } from "sonner";
import type { Role, PermissionAction } from "@/entities/role";
import { Loader2 } from "lucide-react";

interface EditRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role | null;
  onSuccess?: () => void;
}

interface FormValues {
  name: string;
  description: string;
  permissions: Record<string, PermissionAction[]>;
}

export function EditRoleDialog({ open, onOpenChange, role, onSuccess }: EditRoleDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormValues>();

  useEffect(() => {
    if (role && open) {
      reset({
        name: role.name,
        description: role.description || "",
        permissions: role.permissions || {},
      });
    }
  }, [role, open, reset]);

  const permissions = watch("permissions");

  const onSubmit = async (data: FormValues) => {
    if (!role) return;

    try {
      setIsSubmitting(true);

      await rolesApi.updateRolePermissions(role.id, data.permissions);

      if (data.name !== role.name || data.description !== role.description) {
        await rolesApi.updateRole(role.id, {
          name: data.name,
          description: data.description,
        });
      }

      toast.success("Rol actualizado exitosamente");
      onOpenChange(false);
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error al actualizar el rol");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Rol</DialogTitle>
          <DialogDescription>
            Modifica el nombre, descripción y permisos del rol
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Rol *</Label>
            <Input
              id="name"
              {...register("name", { required: "El nombre es requerido" })}
              className={errors.name ? "border-destructive" : ""}
              disabled={role?.isSystem}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            {role?.isSystem && (
              <p className="text-xs text-muted-foreground">Los roles del sistema no pueden renombrarse</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" rows={3} {...register("description")} />
          </div>

          <div className="space-y-2">
            <Label>Permisos *</Label>
            <PermissionsEditor
              value={permissions || {}}
              onChange={(newPermissions) => setValue("permissions", newPermissions)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Guardando...
                </>
              ) : (
                "Guardar Cambios"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
