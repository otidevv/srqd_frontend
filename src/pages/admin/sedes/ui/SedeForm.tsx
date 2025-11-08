import { useState } from "react";
import type { Sede, CreateSedeDTO, UpdateSedeDTO } from "@/entities/sede";
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

interface SedeFormProps {
  sede?: Sede;
  onSubmit: (data: CreateSedeDTO | UpdateSedeDTO) => Promise<void>;
  onCancel: () => void;
}

export function SedeForm({ sede, onSubmit, onCancel }: SedeFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: sede?.nombre || "",
    direccion: sede?.direccion || "",
    telefono: sede?.telefono || "",
    email: sede?.email || "",
    activo: sede?.activo ?? true,
  });

  const isEditing = !!sede;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        const updateData: UpdateSedeDTO = {
          nombre: formData.nombre,
          direccion: formData.direccion || undefined,
          telefono: formData.telefono || undefined,
          email: formData.email || undefined,
          activo: formData.activo,
        };

        await onSubmit(updateData);
      } else {
        const createData: CreateSedeDTO = {
          nombre: formData.nombre,
          direccion: formData.direccion || undefined,
          telefono: formData.telefono || undefined,
          email: formData.email || undefined,
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
      <div className="grid grid-cols-1 gap-4">
        {/* Nombre */}
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre *</Label>
          <Input
            id="nombre"
            type="text"
            placeholder="Ej: Sede Madre de Dios"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
          />
        </div>

        {/* Direccion */}
        <div className="space-y-2">
          <Label htmlFor="direccion">Dirección</Label>
          <Input
            id="direccion"
            type="text"
            placeholder="Ej: Av. Jorge Chávez 1160"
            value={formData.direccion}
            onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
          />
        </div>

        {/* Telefono */}
        <div className="space-y-2">
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            id="telefono"
            type="tel"
            placeholder="Ej: +51 82 571234"
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Ej: sede@unamad.edu.pe"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        {/* Status - Only show when editing */}
        {isEditing && (
          <div className="space-y-2">
            <Label htmlFor="activo">Estado *</Label>
            <Select
              value={formData.activo ? "true" : "false"}
              onValueChange={(value) =>
                setFormData({ ...formData, activo: value === "true" })
              }
            >
              <SelectTrigger id="activo">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Activo</SelectItem>
                <SelectItem value="false">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
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
          {loading ? "Guardando..." : isEditing ? "Guardar Cambios" : "Crear Sede"}
        </Button>
      </div>
    </form>
  );
}
