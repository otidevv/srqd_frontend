import { useState } from "react";
import type { User, CreateUserDTO, UpdateUserDTO, UserRole, UserStatus } from "@/entities/user";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";

interface UserFormProps {
  user?: User;
  onSubmit: (data: CreateUserDTO | UpdateUserDTO) => Promise<void>;
  onCancel: () => void;
}

export function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "operator" as UserRole,
    status: user?.status || "active" as UserStatus,
    phone: user?.phone || "",
    password: "",
  });

  const isEditing = !!user;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        const updateData: UpdateUserDTO = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: formData.status,
          phone: formData.phone || undefined,
        };

        if (formData.password) {
          updateData.password = formData.password;
        }

        await onSubmit(updateData);
      } else {
        const createData: CreateUserDTO = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: formData.status,
          phone: formData.phone || undefined,
          password: formData.password,
        };

        await onSubmit(createData);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form Fields */}
      <div className="grid gap-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Nombre Completo *</Label>
          <Input
            id="name"
            type="text"
            placeholder="Ej: Juan Pérez López"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Correo Electrónico *</Label>
          <Input
            id="email"
            type="email"
            placeholder="usuario@unamad.edu.pe"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        {/* Role */}
        <div className="space-y-2">
          <Label htmlFor="role">Rol *</Label>
          <Select
            value={formData.role}
            onValueChange={(value) => setFormData({ ...formData, role: value as UserRole })}
          >
            <SelectTrigger id="role">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Administrador</SelectItem>
              <SelectItem value="supervisor">Supervisor</SelectItem>
              <SelectItem value="operator">Operador</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {formData.role === "admin" && "Acceso completo a todas las funciones del sistema"}
            {formData.role === "supervisor" && "Puede gestionar trabajadores y revisar reportes"}
            {formData.role === "operator" && "Puede registrar asistencias y ver información básica"}
          </p>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status">Estado *</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value as UserStatus })}
          >
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Activo</SelectItem>
              <SelectItem value="inactive">Inactivo</SelectItem>
              <SelectItem value="suspended">Suspendido</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+51 982 123 456"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">
            {isEditing ? "Nueva Contraseña (dejar en blanco para mantener)" : "Contraseña *"}
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required={!isEditing}
          />
          {!isEditing && (
            <p className="text-xs text-muted-foreground">
              Mínimo 8 caracteres
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Guardando..." : isEditing ? "Guardar Cambios" : "Crear Usuario"}
        </Button>
      </div>
    </form>
  );
}
