import { useState, useEffect } from "react";
import type { Dependencia, CreateDependenciaDTO, UpdateDependenciaDTO } from "@/entities/dependencia";
import type { Sede } from "@/entities/sede";
import { sedesApi } from "@/shared/api";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/shared/ui";

interface DependenciaFormProps {
  dependencia?: Dependencia;
  onSubmit: (data: CreateDependenciaDTO | UpdateDependenciaDTO) => Promise<void>;
  onCancel: () => void;
}

export function DependenciaForm({ dependencia, onSubmit, onCancel }: DependenciaFormProps) {
  const [loading, setLoading] = useState(false);
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [formData, setFormData] = useState({
    nombre: dependencia?.nombre || "",
    descripcion: dependencia?.descripcion || "",
    jefe: dependencia?.jefe || "",
    sedeId: dependencia?.sedeId || "",
    activo: dependencia?.activo ?? true,
  });

  const isEditing = !!dependencia;

  useEffect(() => {
    const loadData = async () => {
      try {
        const sedesData = await sedesApi.getSedes();
        setSedes(sedesData);
      } catch (error) {
        console.error("Error loading sedes:", error);
      }
    };
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        const updateData: UpdateDependenciaDTO = {
          nombre: formData.nombre,
          descripcion: formData.descripcion || undefined,
          jefe: formData.jefe || undefined,
          sedeId: formData.sedeId,
          activo: formData.activo,
        };

        await onSubmit(updateData);
      } else {
        const createData: CreateDependenciaDTO = {
          nombre: formData.nombre,
          descripcion: formData.descripcion || undefined,
          jefe: formData.jefe || undefined,
          sedeId: formData.sedeId,
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
            placeholder="Ej: Facultad de Ingeniería"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
          />
        </div>

        {/* Descripcion */}
        <div className="space-y-2">
          <Label htmlFor="descripcion">Descripción</Label>
          <Textarea
            id="descripcion"
            placeholder="Descripción de la dependencia"
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            rows={3}
          />
        </div>

        {/* Jefe */}
        <div className="space-y-2">
          <Label htmlFor="jefe">Jefe/Responsable</Label>
          <Input
            id="jefe"
            type="text"
            placeholder="Ej: Dr. Juan Pérez"
            value={formData.jefe}
            onChange={(e) => setFormData({ ...formData, jefe: e.target.value })}
          />
        </div>

        {/* Sede */}
        <div className="space-y-2">
          <Label htmlFor="sede">Sede *</Label>
          <Select
            value={formData.sedeId}
            onValueChange={(value) => setFormData({ ...formData, sedeId: value })}
          >
            <SelectTrigger id="sede">
              <SelectValue placeholder="Selecciona sede" />
            </SelectTrigger>
            <SelectContent>
              {sedes.map((sede) => (
                <SelectItem key={sede.id} value={sede.id}>
                  {sede.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
          {loading ? "Guardando..." : isEditing ? "Guardar Cambios" : "Crear Dependencia"}
        </Button>
      </div>
    </form>
  );
}
