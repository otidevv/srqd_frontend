/**
 * Casos SRQD API Service
 * Handles all case-related operations with the backend
 */

import { apiClient, type ApiResponse } from './client';
import { uploadFiles, uploadFile, base64ToFile, type FileWithCategory } from './archivos';
import type {
  Caso,
  CasoFiltros,
  CasoEstadisticas,
  CrearCasoResult,
  FormularioCasoData,
  Seguimiento,
  CasoEstado,
  CasoTipo,
  CasoPrioridad,
} from '@/entities/caso/model/types';

// Backend types matching
interface BackendCaso {
  id: string;
  codigo: string;
  tipo: string;
  estado: string;
  prioridad: string;
  descripcionHechos: string;
  derechosAfectados?: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  fechaLimite?: string;
  fechaResolucion?: string;
  reclamante?: {
    id: string;
    nombres: string;
    apellidos: string;
    email: string;
    telefono?: string;
    rolReclamante: string;
    tipoDocumento: string;
    numeroDocumento: string;
    sexo: string;
    [key: string]: unknown;
  };
  reclamado?: {
    id: string;
    nombres: string;
    apellidos: string;
    rolReclamado: string;
    [key: string]: unknown;
  };
  archivos?: Array<{
    id: string;
    nombre: string;
    url: string;
    tipo: string;
    tamano: number;
    categoria: string;
    fechaSubida: string;
  }>;
  seguimientos?: Array<{
    id: string;
    casoId: string;
    fecha: string;
    usuarioId: string;
    usuarioNombre: string;
    accion: string;
    comentario: string;
    estadoAnterior?: string;
    estadoNuevo?: string;
    esVisible: boolean;
  }>;
  asignadoA?: string;
  asignado?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  esAnonimo: boolean;
  requiereMediacion: boolean;
  esConfidencial: boolean;
  etiquetas?: string[];
  resolucion?: string;
  recomendaciones?: string;
}

// Convert backend caso to frontend format
function convertBackendCaso(backendCaso: BackendCaso): Caso {
  return {
    id: backendCaso.id,
    codigo: backendCaso.codigo,
    tipo: backendCaso.tipo.toLowerCase() as CasoTipo,
    estado: backendCaso.estado.toLowerCase() as CasoEstado,
    prioridad: backendCaso.prioridad.toLowerCase() as CasoPrioridad,
    fechaCreacion: new Date(backendCaso.fechaCreacion),
    fechaActualizacion: new Date(backendCaso.fechaActualizacion),
    fechaLimite: backendCaso.fechaLimite ? new Date(backendCaso.fechaLimite) : undefined,
    fechaResolucion: backendCaso.fechaResolucion ? new Date(backendCaso.fechaResolucion) : undefined,
    reclamante: backendCaso.reclamante ? {
      id: backendCaso.reclamante.id,
      rolReclamante: backendCaso.reclamante.rolReclamante.toLowerCase() as any,
      tipoDocumento: backendCaso.reclamante.tipoDocumento.toLowerCase() as any,
      numeroDocumento: backendCaso.reclamante.numeroDocumento,
      nombres: backendCaso.reclamante.nombres?.split(' ')[0] || '',
      apellidoPaterno: backendCaso.reclamante.apellidos?.split(' ')[0] || '',
      apellidoMaterno: backendCaso.reclamante.apellidos?.split(' ')[1] || '',
      sexo: (backendCaso.reclamante.sexo?.toLowerCase() || 'masculino') as any,
      celular: backendCaso.reclamante.telefono || '',
      domicilio: backendCaso.reclamante.domicilio as string || '',
      correo: backendCaso.reclamante.email || '',
      autorizacionCorreo: true,
      ...(backendCaso.reclamante as any),
    } : {} as any,
    reclamado: backendCaso.reclamado ? {
      id: backendCaso.reclamado.id,
      rolReclamado: backendCaso.reclamado.rolReclamado.toLowerCase() as any,
      nombres: backendCaso.reclamado.nombres?.split(' ')[0] || '',
      apellidoPaterno: backendCaso.reclamado.apellidos?.split(' ')[0] || '',
      apellidoMaterno: backendCaso.reclamado.apellidos?.split(' ')[1] || '',
      ...(backendCaso.reclamado as any),
    } : {} as any,
    descripcionHechos: backendCaso.descripcionHechos,
    derechosAfectados: backendCaso.derechosAfectados || '',
    archivos: (backendCaso.archivos || []).map(a => ({
      ...a,
      categoria: a.categoria?.toLowerCase() as any || 'prueba_documental',
      fechaSubida: new Date(a.fechaSubida),
    })),
    asignadoA: backendCaso.asignadoA,
    asignadoNombre: backendCaso.asignado?.name,
    seguimientos: (backendCaso.seguimientos || []).map(s => ({
      ...s,
      fecha: new Date(s.fecha),
      estadoAnterior: s.estadoAnterior?.toLowerCase() as CasoEstado | undefined,
      estadoNuevo: s.estadoNuevo?.toLowerCase() as CasoEstado | undefined,
    })),
    esAnonimo: backendCaso.esAnonimo,
    requiereMediacion: backendCaso.requiereMediacion,
    esConfidencial: backendCaso.esConfidencial,
    etiquetas: backendCaso.etiquetas || [],
    resolucion: backendCaso.resolucion,
    recomendaciones: backendCaso.recomendaciones,
  };
}

class CasosApi {
  /**
   * Get all casos with optional filters
   */
  async getCasos(filtros?: CasoFiltros): Promise<Caso[]> {
    const params: Record<string, string> = {};

    if (filtros) {
      if (filtros.tipo && filtros.tipo.length > 0) {
        params.tipo = filtros.tipo[0].toUpperCase(); // Backend uses uppercase
      }
      if (filtros.estado && filtros.estado.length > 0) {
        params.estado = filtros.estado[0].toUpperCase();
      }
      if (filtros.prioridad && filtros.prioridad.length > 0) {
        params.prioridad = filtros.prioridad[0].toUpperCase();
      }
      if (filtros.fechaDesde) {
        params.fechaDesde = filtros.fechaDesde.toISOString();
      }
      if (filtros.fechaHasta) {
        params.fechaHasta = filtros.fechaHasta.toISOString();
      }
      if (filtros.asignadoA) {
        params.asignadoA = filtros.asignadoA;
      }
      if (filtros.busqueda) {
        params.busqueda = filtros.busqueda;
      }
    }

    const response = await apiClient.get<ApiResponse<BackendCaso[]>>('/casos', params);
    return response.data.map(convertBackendCaso);
  }

  /**
   * Get caso by ID
   */
  async getCasoById(id: string): Promise<Caso | null> {
    try {
      const response = await apiClient.get<ApiResponse<BackendCaso>>(`/casos/${id}`);
      return convertBackendCaso(response.data);
    } catch (error) {
      return null;
    }
  }

  /**
   * Get caso by public code
   */
  async getCasoByCodigo(codigo: string): Promise<Caso | null> {
    try {
      const response = await apiClient.get<ApiResponse<BackendCaso>>(`/casos/codigo/${codigo}`);
      return convertBackendCaso(response.data);
    } catch (error) {
      return null;
    }
  }

  /**
   * Create new caso
   */
  async createCaso(data: FormularioCasoData): Promise<CrearCasoResult> {
    try {
      // Check if reclamado fields are filled (Step 2 is optional)
      // Need to check for non-empty strings, not just truthy values
      const hasReclamadoData =
        (data.nombresReclamado && data.nombresReclamado.trim() !== '') ||
        (data.apellidoPaternoReclamado && data.apellidoPaternoReclamado.trim() !== '') ||
        (data.apellidoMaternoReclamado && data.apellidoMaternoReclamado.trim() !== '');

      const payload: any = {
        tipo: data.tipo.toUpperCase(),
        prioridad: 'MEDIA', // Default priority
        descripcionHechos: data.descripcionHechos,
        derechosAfectados: data.derechosAfectados,
        esAnonimo: false,
        requiereMediacion: data.tipo === 'reclamo' || data.tipo === 'denuncia',
        esConfidencial: data.tipo === 'denuncia',
        etiquetas: [],
        reclamante: {
          rolReclamante: data.rolReclamante.toUpperCase(),
          tipoDocumento: data.tipoDocumento.toUpperCase(),
          numeroDocumento: data.numeroDocumento,
          nombres: data.nombres,
          apellidoPaterno: data.apellidoPaterno,
          apellidoMaterno: data.apellidoMaterno,
          sexo: data.sexo.toUpperCase(),
          correo: data.correo,
          celular: data.celular,
          autorizacionCorreo: data.autorizacionCorreo,
          domicilio: data.domicilio,
          carreraProfesional: data.carreraProfesional,
          codigoUniversitario: data.codigoUniversitario,
          semestreEgreso: data.semestreEgreso,
          facultad: data.facultad,
          departamentoAcademico: data.departamentoAcademico,
          oficinaAdministrativa: data.oficinaAdministrativa,
          cargo: data.cargo,
        },
      };

      // Only include reclamado if the user filled in the required fields
      if (hasReclamadoData) {
        // Build reclamado object and filter out empty strings
        const reclamadoData: any = {
          rolReclamado: data.rolReclamado?.toUpperCase(),
          nombres: data.nombresReclamado,
          apellidoPaterno: data.apellidoPaternoReclamado,
          apellidoMaterno: data.apellidoMaternoReclamado,
          sexo: data.sexoReclamado?.toUpperCase(),
          correo: data.correoReclamado,
          celular: data.celularReclamado,
          carreraProfesional: data.carreraReclamado,
          codigoUniversitario: data.codigoReclamado,
          departamentoAcademico: data.departamentoReclamado,
          oficinaAdministrativa: data.oficinaReclamado,
          cargo: data.cargoReclamado,
        };

        // Filter out undefined, null, and empty strings
        payload.reclamado = Object.fromEntries(
          Object.entries(reclamadoData).filter(([_, value]) => {
            return value !== undefined && value !== null && value !== '';
          })
        );
      }

      const response = await apiClient.post<ApiResponse<BackendCaso>>('/casos', payload);
      const caso = convertBackendCaso(response.data);

      // Upload files if present with proper categories
      const casoId = caso.id;
      const filesToUpload: FileWithCategory[] = [];

      // 1. Add document identity file
      if (data.documentoIdentidad) {
        // Handle FileList or File
        if (data.documentoIdentidad instanceof FileList && data.documentoIdentidad.length > 0) {
          filesToUpload.push({
            file: data.documentoIdentidad[0],
            categoria: 'DOCUMENTO_IDENTIDAD'
          });
        } else if (data.documentoIdentidad instanceof File) {
          filesToUpload.push({
            file: data.documentoIdentidad,
            categoria: 'DOCUMENTO_IDENTIDAD'
          });
        }
      }

      // 2. Add evidence files (archivoPruebas)
      if (data.archivoPruebas && data.archivoPruebas.length > 0) {
        Array.from(data.archivoPruebas).forEach(file => {
          filesToUpload.push({
            file,
            categoria: 'PRUEBA_DOCUMENTAL'
          });
        });
      }

      // 3. Add signature file (archivoFirma)
      if (data.archivoFirma) {
        filesToUpload.push({
          file: data.archivoFirma,
          categoria: 'FIRMA_DIGITAL'
        });
      }

      // 4. Convert and add base64 signature if present (from touch devices)
      if ((data as any).firmaBase64) {
        try {
          const firmaFile = base64ToFile((data as any).firmaBase64, 'firma-digital.png');
          filesToUpload.push({
            file: firmaFile,
            categoria: 'FIRMA_DIGITAL'
          });
        } catch (error) {
          console.error('Error converting base64 signature:', error);
        }
      }

      // Upload all files with their categories
      if (filesToUpload.length > 0) {
        const uploadResult = await uploadFiles(casoId, filesToUpload);

        if (!uploadResult.success) {
          console.error('Some files failed to upload:', uploadResult.errors);
          // Don't fail the whole operation, just log the errors
          // The caso was created successfully
        }
      }

      return {
        success: true,
        caso,
        codigo: caso.codigo,
      };
    } catch (error: any) {
      // Re-throw the error to preserve backend validation details
      throw error;
    }
  }

  /**
   * Update caso
   */
  async updateCaso(id: string, updates: Partial<Caso>): Promise<boolean> {
    try {
      const payload: any = {};

      if (updates.estado) {
        payload.estado = updates.estado.toUpperCase();
      }
      if (updates.prioridad) {
        payload.prioridad = updates.prioridad.toUpperCase();
      }
      if (updates.resolucion) {
        payload.resolucion = updates.resolucion;
      }
      if (updates.recomendaciones) {
        payload.recomendaciones = updates.recomendaciones;
      }

      await apiClient.patch<ApiResponse>(`/casos/${id}`, payload);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Update caso estado
   */
  async updateCasoEstado(
    id: string,
    nuevoEstado: CasoEstado
  ): Promise<boolean> {
    try {
      await apiClient.patch<ApiResponse>(`/casos/${id}`, {
        estado: nuevoEstado.toUpperCase(),
      });

      // Add seguimiento automático
      await this.addSeguimiento(id, {
        accion: 'Cambio de estado',
        comentario: `Estado actualizado a: ${nuevoEstado}`,
        esVisible: true,
      });

      return true;
    } catch (error: any) {
      console.error('Error en updateCasoEstado:', error);
      throw error;
    }
  }

  /**
   * Assign caso to user
   */
  async asignarCaso(
    id: string,
    asignadoA: string,
    asignadoNombre: string,
    usuarioId: string,
    usuarioNombre: string
  ): Promise<boolean> {
    try {
      await apiClient.post<ApiResponse>(`/casos/${id}/asignar`, { asignadoA });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Add seguimiento to caso
   */
  async addSeguimiento(
    casoId: string,
    data: {
      accion: string;
      comentario: string;
      esVisible?: boolean;
      archivosIds?: string[];
    }
  ): Promise<boolean> {
    try {
      console.log('=== ENVIANDO SEGUIMIENTO ===');
      console.log('Caso ID:', casoId);
      console.log('Datos:', data);

      const response = await apiClient.post<ApiResponse>(`/casos/${casoId}/seguimientos`, {
        accion: data.accion,
        comentario: data.comentario,
        esVisible: data.esVisible ?? true,
        archivosIds: data.archivosIds,
      });

      console.log('Respuesta del servidor:', response);
      return true;
    } catch (error: any) {
      console.error('=== ERROR AL GUARDAR SEGUIMIENTO ===');
      console.error('Error completo:', error);
      console.error('Error message:', error.message);
      console.error('Error status:', error.status);
      console.error('Error details:', error.details);
      console.error('===================================');

      // Propagar el error para que el componente lo maneje
      throw error;
    }
  }

  /**
   * Get estadisticas for dashboard
   */
  async getCasoEstadisticas(): Promise<CasoEstadisticas> {
    try {
      const response = await apiClient.get<ApiResponse<any>>('/casos/estadisticas');
      const data = response.data;

      return {
        total: data.total,
        porTipo: {
          reclamo: data.porTipo.find((t: any) => t.tipo === 'RECLAMO')?._count || 0,
          queja: data.porTipo.find((t: any) => t.tipo === 'QUEJA')?._count || 0,
          denuncia: data.porTipo.find((t: any) => t.tipo === 'DENUNCIA')?._count || 0,
        },
        porEstado: {
          pendiente: data.porEstado.find((e: any) => e.estado === 'PENDIENTE')?._count || 0,
          en_revision: data.porEstado.find((e: any) => e.estado === 'EN_REVISION')?._count || 0,
          en_proceso: data.porEstado.find((e: any) => e.estado === 'EN_PROCESO')?._count || 0,
          resuelto: data.porEstado.find((e: any) => e.estado === 'RESUELTO')?._count || 0,
          archivado: data.porEstado.find((e: any) => e.estado === 'ARCHIVADO')?._count || 0,
          rechazado: data.porEstado.find((e: any) => e.estado === 'RECHAZADO')?._count || 0,
        },
        porPrioridad: {
          baja: data.porPrioridad.find((p: any) => p.prioridad === 'BAJA')?._count || 0,
          media: data.porPrioridad.find((p: any) => p.prioridad === 'MEDIA')?._count || 0,
          alta: data.porPrioridad.find((p: any) => p.prioridad === 'ALTA')?._count || 0,
          urgente: data.porPrioridad.find((p: any) => p.prioridad === 'URGENTE')?._count || 0,
        },
        casosResueltos: data.casosResueltos || 0,
        tasaResolucion: data.tasaResolucion || 0,
        promedioResolucionDias: 15, // TODO: Backend calculation needed
        datosMensuales: data.datosMensuales || [],
      };
    } catch {
      return {
        total: 0,
        porTipo: { reclamo: 0, queja: 0, denuncia: 0 },
        porEstado: { pendiente: 0, en_revision: 0, en_proceso: 0, resuelto: 0, archivado: 0, rechazado: 0 },
        porPrioridad: { baja: 0, media: 0, alta: 0, urgente: 0 },
        casosResueltos: 0,
        tasaResolucion: 0,
        promedioResolucionDias: 0,
        datosMensuales: [],
      };
    }
  }

  /**
   * Update caso prioridad
   */
  async updateCasoPrioridad(
    id: string,
    nuevaPrioridad: CasoPrioridad,
    usuarioId: string,
    usuarioNombre: string
  ): Promise<boolean> {
    try {
      await apiClient.patch<ApiResponse>(`/casos/${id}`, {
        prioridad: nuevaPrioridad.toUpperCase(),
      });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Delete (archive) caso
   */
  async deleteCaso(id: string): Promise<boolean> {
    try {
      await apiClient.delete<ApiResponse>(`/casos/${id}`);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Upload archivo to caso
   */
  async uploadArchivo(casoId: string, file: File): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await apiClient.upload<ApiResponse>(`/archivos/upload/${casoId}`, formData);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get archivos for caso
   */
  async getArchivos(casoId: string): Promise<any[]> {
    try {
      const response = await apiClient.get<ApiResponse<any[]>>(`/archivos/caso/${casoId}`);
      return response.data;
    } catch {
      return [];
    }
  }

  /**
   * Download archivo
   */
  async downloadArchivo(archivoId: string, filename: string): Promise<void> {
    await apiClient.download(`/archivos/${archivoId}/download`, filename);
  }

  /**
   * Delete archivo
   */
  async deleteArchivo(archivoId: string): Promise<boolean> {
    try {
      await apiClient.delete<ApiResponse>(`/archivos/${archivoId}`);
      return true;
    } catch {
      return false;
    }
  }
}

export const casosApi = new CasosApi();

// Named exports for backward compatibility
export const {
  getCasos,
  getCasoById,
  getCasoByCodigo,
  createCaso,
  updateCaso,
  updateCasoEstado,
  asignarCaso,
  addSeguimiento,
  getCasoEstadisticas,
  updateCasoPrioridad,
} = casosApi;
