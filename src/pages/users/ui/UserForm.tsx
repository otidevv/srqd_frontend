import { useState, useEffect } from "react";
import type { User, CreateUserDTO, UpdateUserDTO, UserStatus, TipoDocumento } from "@/entities/user";
import type { Role } from "@/entities/role";
import type { Sede } from "@/entities/sede";
import type { Dependencia } from "@/entities/dependencia";
import { rolesApi, sedesApi, dependenciasApi } from "@/shared/api";
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
  const [roles, setRoles] = useState<Role[]>([]);
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [dependencias, setDependencias] = useState<Dependencia[]>([]);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    roleId: user?.roleId || "",
    status: user?.status || "active" as UserStatus,
    phone: user?.phone || "",
    password: "",
    tipoDocumento: user?.tipoDocumento,
    numeroDocumento: user?.numeroDocumento || "",
    fechaNacimiento: user?.fechaNacimiento ? user.fechaNacimiento.split('T')[0] : "",
    direccion: user?.direccion || "",
    cargo: user?.cargo || "",
    sedeId: user?.sedeId,
    dependenciaId: user?.dependenciaId,
  });

  const isEditing = !!user;

  useEffect(() => {
    const loadData = async () => {
      try {
        const [rolesData, sedesData, dependenciasData] = await Promise.all([
          rolesApi.getRoles(),
          sedesApi.getSedes(),
          dependenciasApi.getDependencias(),
        ]);
        setRoles(rolesData);
        setSedes(sedesData);
        setDependencias(dependenciasData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        const updateData: UpdateUserDTO = {
          name: formData.name,
          email: formData.email,
          roleId: formData.roleId,
          status: formData.status,
          phone: formData.phone || undefined,
          tipoDocumento: formData.tipoDocumento,
          numeroDocumento: formData.numeroDocumento || undefined,
          fechaNacimiento: formData.fechaNacimiento || undefined,
          direccion: formData.direccion || undefined,
          cargo: formData.cargo || undefined,
          sedeId: formData.sedeId || undefined,
          dependenciaId: formData.dependenciaId || undefined,
        };

        if (formData.password) {
          updateData.password = formData.password;
        }

        await onSubmit(updateData);
      } else {
        const createData: CreateUserDTO = {
          name: formData.name,
          email: formData.email,
          roleId: formData.roleId,
          status: formData.status,
          phone: formData.phone || undefined,
          password: formData.password,
          tipoDocumento: formData.tipoDocumento,
          numeroDocumento: formData.numeroDocumento || undefined,
          fechaNacimiento: formData.fechaNacimiento || undefined,
          direccion: formData.direccion || undefined,
          cargo: formData.cargo || undefined,
          sedeId: formData.sedeId || undefined,
          dependenciaId: formData.dependenciaId || undefined,
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-2 md:col-span-2">
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

        {/* Role */}
        <div className="space-y-2">
          <Label htmlFor="role">Rol *</Label>
          <Select
            value={formData.roleId}
            onValueChange={(value) => setFormData({ ...formData, roleId: value })}
          >
            <SelectTrigger id="role">
              <SelectValue placeholder="Selecciona un rol" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name} {role.isSystem && "(Sistema)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

        {/* Tipo de Documento */}
        <div className="space-y-2">
          <Label htmlFor="tipoDocumento">Tipo de Documento</Label>
          <Select
            value={formData.tipoDocumento || "none"}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                tipoDocumento: value === "none" ? undefined : (value as TipoDocumento),
              })
            }
          >
            <SelectTrigger id="tipoDocumento">
              <SelectValue placeholder="Selecciona tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Sin especificar</SelectItem>
              <SelectItem value="DNI">DNI</SelectItem>
              <SelectItem value="CARNET_EXTRANJERIA">Carnet Extranjería</SelectItem>
              <SelectItem value="PASAPORTE">Pasaporte</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Número de Documento */}
        <div className="space-y-2">
          <Label htmlFor="numeroDocumento">Nº Documento</Label>
          <Input
            id="numeroDocumento"
            type="text"
            placeholder="Ej: 12345678"
            value={formData.numeroDocumento}
            onChange={(e) => setFormData({ ...formData, numeroDocumento: e.target.value })}
          />
        </div>

        {/* Fecha de Nacimiento */}
        <div className="space-y-2">
          <Label htmlFor="fechaNacimiento">Fecha Nacimiento</Label>
          <Input
            id="fechaNacimiento"
            type="date"
            value={formData.fechaNacimiento}
            onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
          />
        </div>

        {/* Cargo */}
        <div className="space-y-2">
          <Label htmlFor="cargo">Cargo</Label>
          <Input
            id="cargo"
            type="text"
            placeholder="Ej: Analista"
            value={formData.cargo}
            onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
          />
        </div>

        {/* Sede */}
        <div className="space-y-2">
          <Label htmlFor="sede">Sede</Label>
          <Select
            value={formData.sedeId || "none"}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                sedeId: value === "none" ? undefined : value,
              })
            }
          >
            <SelectTrigger id="sede">
              <SelectValue placeholder="Selecciona sede" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Sin especificar</SelectItem>
              {sedes.map((sede) => (
                <SelectItem key={sede.id} value={sede.id}>
                  {sede.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Dependencia */}
        <div className="space-y-2">
          <Label htmlFor="dependencia">Dependencia</Label>
          <Select
            value={formData.dependenciaId || "none"}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                dependenciaId: value === "none" ? undefined : value,
              })
            }
          >
            <SelectTrigger id="dependencia">
              <SelectValue placeholder="Selecciona dependencia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Sin especificar</SelectItem>
              {dependencias.map((dep) => (
                <SelectItem key={dep.id} value={dep.id}>
                  {dep.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Dirección */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="direccion">Dirección</Label>
          <Input
            id="direccion"
            type="text"
            placeholder="Ej: Jr. Los Incas 123"
            value={formData.direccion}
            onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
          />
        </div>

        {/* Password */}
        <div className="space-y-2 md:col-span-2">
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
