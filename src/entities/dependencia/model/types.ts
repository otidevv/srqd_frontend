/**
 * Dependencia entity types
 * Represents departments, faculties, offices, institutes within the university
 */

export interface Dependencia {
  id: string;
  nombre: string;
  descripcion?: string;
  jefe?: string; // Nombre del jefe (no es referencia a usuario)
  sedeId: string;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDependenciaDTO {
  nombre: string;
  descripcion?: string;
  jefe?: string;
  sedeId: string;
}

export interface UpdateDependenciaDTO {
  nombre?: string;
  descripcion?: string;
  jefe?: string;
  sedeId?: string;
  activo?: boolean;
}
