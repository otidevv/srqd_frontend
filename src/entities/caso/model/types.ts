/**
 * Entidades del Sistema de Registro de Reclamos, Quejas y Denuncias (SRQD)
 * Defensoría Universitaria - UNAMAD
 */

// Tipos de casos SRQD
export type CasoTipo = 'reclamo' | 'queja' | 'denuncia'

// Estados del caso
export type CasoEstado =
  | 'pendiente'       // Recién registrado, esperando asignación
  | 'en_revision'     // Siendo revisado por la defensoría
  | 'en_proceso'      // En proceso de resolución
  | 'resuelto'        // Caso resuelto
  | 'archivado'       // Archivado sin resolución
  | 'rechazado'       // Rechazado por no ser competencia

// Prioridad del caso
export type CasoPrioridad = 'baja' | 'media' | 'alta' | 'urgente'

// Roles de usuarios en el sistema
export type RolUsuario =
  | 'estudiante'
  | 'egresado'
  | 'docente'
  | 'administrativo'
  | 'externo'

// Tipo de documento
export type TipoDocumento = 'dni' | 'carnet_extranjeria' | 'pasaporte'

// Sexo
export type Sexo = 'masculino' | 'femenino'

/**
 * Datos del Reclamante (persona que presenta el caso)
 */
export interface Reclamante {
  id: string
  rolReclamante: RolUsuario
  tipoDocumento: TipoDocumento
  numeroDocumento: string
  nombres: string
  apellidoPaterno: string
  apellidoMaterno: string
  sexo: Sexo
  celular: string
  domicilio: string
  correo: string
  autorizacionCorreo: boolean
  documentoIdentidadUrl?: string

  // Campos condicionales según rol
  carreraProfesional?: string
  codigoUniversitario?: string
  semestreEgreso?: string
  facultad?: string
  departamentoAcademico?: string
  oficinaAdministrativa?: string
  cargo?: string
}

/**
 * Datos del Reclamado (persona contra quien se presenta el caso)
 */
export interface Reclamado {
  id: string
  rolReclamado: RolUsuario
  nombres: string
  apellidoPaterno: string
  apellidoMaterno: string
  sexo?: Sexo
  correo?: string
  celular?: string

  // Campos condicionales según rol
  carreraProfesional?: string
  codigoUniversitario?: string
  departamentoAcademico?: string
  oficinaAdministrativa?: string
  cargo?: string
}

/**
 * Registro de seguimiento del caso
 */
export interface Seguimiento {
  id: string
  casoId: string
  fecha: Date
  usuarioId: string
  usuarioNombre: string
  accion: string
  comentario: string
  estadoAnterior?: CasoEstado
  estadoNuevo?: CasoEstado
  esVisible: boolean // Si es visible para el reclamante
  archivos?: Archivo[] // Archivos adjuntos a este seguimiento
}

/**
 * Categoría de archivo
 */
export type CategoriaArchivo =
  | 'documento_identidad'
  | 'prueba_documental'
  | 'pdf_generado'
  | 'firma_digital'
  | 'archivo_seguimiento'

/**
 * Archivo adjunto
 */
export interface Archivo {
  id: string
  nombre: string
  url: string
  tipo: string
  tamano: number
  categoria: CategoriaArchivo
  fechaSubida: Date
  seguimientoId?: string // Si el archivo está asociado a un seguimiento
}

/**
 * Caso SRQD Principal
 */
export interface Caso {
  id: string
  codigo: string // Código único de seguimiento (ej: "REC-2025-001")
  tipo: CasoTipo
  estado: CasoEstado
  prioridad: CasoPrioridad

  // Fechas
  fechaCreacion: Date
  fechaActualizacion: Date
  fechaLimite?: Date
  fechaResolucion?: Date

  // Partes involucradas
  reclamante: Reclamante
  reclamado: Reclamado

  // Descripción del caso
  descripcionHechos: string
  derechosAfectados: string

  // Archivos y pruebas
  pruebasUrl?: string
  archivos: Archivo[]

  // Gestión interna
  asignadoA?: string // ID del usuario responsable
  asignadoNombre?: string

  // Seguimiento
  seguimientos: Seguimiento[]

  // Resolución
  resolucion?: string
  recomendaciones?: string

  // Metadatos
  esAnonimo: boolean
  requiereMediacion: boolean
  esConfidencial: boolean
  etiquetas: string[]
}

/**
 * Filtros para búsqueda de casos
 */
export interface CasoFiltros {
  tipo?: CasoTipo[]
  estado?: CasoEstado[]
  prioridad?: CasoPrioridad[]
  fechaDesde?: Date
  fechaHasta?: Date
  asignadoA?: string
  busqueda?: string // Búsqueda en código, nombres, descripciones
}

/**
 * Estadísticas del dashboard
 */
export interface CasoEstadisticas {
  total: number
  porTipo: Record<CasoTipo, number>
  porEstado: Record<CasoEstado, number>
  porPrioridad: Record<CasoPrioridad, number>
  casosResueltos: number
  tasaResolucion: number
  promedioResolucionDias: number
  datosMensuales: {
    mes: string
    registrados: number
    resueltos: number
    pendientes: number
  }[]
}

/**
 * Resultado de creación de caso
 */
export interface CrearCasoResult {
  success: boolean
  caso?: Caso
  codigo?: string
  error?: string
}

/**
 * Datos del formulario completo
 */
export interface FormularioCasoData {
  tipo: CasoTipo

  // Step 1: Reclamante
  rolReclamante: RolUsuario
  tipoDocumento: TipoDocumento
  numeroDocumento: string
  nombres: string
  apellidoPaterno: string
  apellidoMaterno: string
  sexo: Sexo
  celular: string
  domicilio: string
  correo: string
  autorizacionCorreo: boolean
  documentoIdentidad: File
  carreraProfesional?: string
  codigoUniversitario?: string
  semestreEgreso?: string
  facultad?: string
  departamentoAcademico?: string
  oficinaAdministrativa?: string
  cargo?: string

  // Step 2: Reclamado
  rolReclamado: RolUsuario
  nombresReclamado: string
  apellidoPaternoReclamado: string
  apellidoMaternoReclamado: string
  sexoReclamado?: Sexo
  correoReclamado?: string
  celularReclamado?: string
  carreraReclamado?: string
  codigoReclamado?: string
  departamentoReclamado?: string
  oficinaReclamado?: string
  cargoReclamado?: string

  // Step 3: Descripción
  descripcionHechos: string
  derechosAfectados: string

  // Step 4: Pruebas
  pruebasUrl?: string
  archivoPruebas?: FileList
  dispositivo?: string
  archivoFirma?: File
  confirmacionDatos: boolean
}
