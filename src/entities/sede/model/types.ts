/**
 * Sede entity types
 * Represents university campuses/locations
 */

export interface Sede {
  id: string;
  nombre: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSedeDTO {
  nombre: string;
  direccion?: string;
  telefono?: string;
  email?: string;
}

export interface UpdateSedeDTO {
  nombre?: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  activo?: boolean;
}
