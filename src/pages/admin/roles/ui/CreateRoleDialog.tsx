import { useState } from "react";
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
import type { PermissionAction } from "@/entities/role";
import { Loader2 } from "lucide-react";

interface CreateRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface FormValues {
  name: string;
  description: string;
  permissions: Record<string, PermissionAction[]>;
}

export function CreateRoleDialog({ open, onOpenChange, onSuccess }: CreateRoleDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      permissions: {},
    },
  });

  const permissions = watch("permissions");

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);

      await rolesApi.createRole({
        name: data.name,
        description: data.description,
        permissions: data.permissions,
      });

      toast.success("Rol creado exitosamente");
      reset();
      onOpenChange(false);
      onSuccess?.();
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Error al crear el rol";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Rol</DialogTitle>
          <DialogDescription>
            Define un nuevo rol con permisos personalizados para el sistema
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Nombre del Rol <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Ej: Coordinador de Área"
              {...register("name", {
                required: "El nombre es requerido",
                minLength: {
                  value: 3,
                  message: "El nombre debe tener al menos 3 caracteres",
                },
              })}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Descripción del rol y sus responsabilidades..."
              rows={3}
              {...register("description")}
            />
          </div>

          {/* Permissions */}
          <div className="space-y-2">
            <Label>
              Permisos <span className="text-destructive">*</span>
            </Label>
            <PermissionsEditor
              value={permissions}
              onChange={(newPermissions) => setValue("permissions", newPermissions)}
            />
            {Object.keys(permissions).length === 0 && (
              <p className="text-sm text-muted-foreground">
                Selecciona al menos un permiso para el rol
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || Object.keys(permissions).length === 0}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Creando...
                </>
              ) : (
                "Crear Rol"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
