/**
 * Tipos para el módulo de Publicaciones
 */

export type TipoPublicacion = 'anuncio' | 'comunicado' | 'evento' | 'noticia';

export interface Publicacion {
  id: string;
  titulo: string;
  descripcion: string;
  imagenUrl?: string;
  documentoUrl?: string;
  creadoPor: string;
  fechaPublicacion: string;
  fechaExpiracion?: string;
  activo: boolean;
  prioridad: number;
  tipo: TipoPublicacion;
  createdAt: string;
  updatedAt: string;
  creador?: {
    id: string;
    name: string;
    email?: string;
  };
}

export interface CreatePublicacionData {
  titulo: string;
  descripcion: string;
  imagenUrl?: string;
  documentoUrl?: string;
  fechaExpiracion?: string;
  prioridad?: number;
  tipo?: TipoPublicacion;
}

export interface UpdatePublicacionData extends Partial<CreatePublicacionData> {
  activo?: boolean;
}
