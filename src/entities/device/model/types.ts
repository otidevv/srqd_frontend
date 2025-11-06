/**
 * Device Types - ZKTeco Biometric Devices
 * Dispositivos de control de asistencia biométrico
 */

export type DeviceStatus = 'online' | 'offline' | 'error' | 'maintenance'
export type DeviceType = 'fingerprint' | 'facial' | 'rfid' | 'hybrid'

/**
 * Dispositivo ZKTeco
 */
export interface ZKTecoDevice {
  id: string
  name: string // Nombre descriptivo del dispositivo
  serialNumber: string // Número de serie del dispositivo
  model: string // Modelo del dispositivo (ej: ZK-K40, ZK-F18, etc.)
  type: DeviceType // Tipo de dispositivo

  // Relación con institución
  institutionId: string // ID del colegio al que pertenece
  institutionName: string // Nombre del colegio
  subdomain: string // Subdominio del colegio (ej: milgras, santarosa)

  // Configuración de red
  ipAddress: string // Dirección IP del dispositivo
  port: number // Puerto de conexión (default: 4370)

  // Estado y conexión
  status: DeviceStatus
  lastSync: string // Última sincronización exitosa (ISO date)
  lastSeen: string // Última vez que se detectó online (ISO date)

  // Ubicación física
  location: string // Ubicación física (ej: "Entrada principal", "Piso 2")
  description?: string // Descripción adicional

  // Configuración
  maxUsers: number // Capacidad máxima de usuarios
  maxFingerprints: number // Capacidad de huellas
  currentUsers: number // Usuarios registrados actualmente

  // API y autenticación
  apiKey?: string // API Key para comunicación
  devicePassword?: string // Password del dispositivo

  // Metadata
  createdAt: string // Fecha de registro (ISO date)
  updatedAt: string // Última actualización (ISO date)
  createdBy: string // Usuario que lo registró
}

/**
 * Log de sincronización de dispositivos
 */
export interface DeviceSyncLog {
  id: string
  deviceId: string
  deviceName: string
  institutionId: string

  syncType: 'attendance' | 'users' | 'configuration' | 'manual'
  status: 'success' | 'error' | 'partial'

  recordsProcessed: number
  recordsFailed: number

  startedAt: string
  completedAt: string
  duration: number // en segundos

  errorMessage?: string
  details?: string // JSON con detalles adicionales
}

/**
 * Registro de asistencia desde ZKTeco
 */
export interface AttendanceRecord {
  id: string
  deviceId: string
  institutionId: string

  userId: string // ID del usuario en el sistema
  userCode: string // Código del usuario en el dispositivo ZKTeco
  userName: string

  timestamp: string // Fecha/hora del registro (ISO date)
  verifyMode: 'fingerprint' | 'facial' | 'rfid' | 'password'
  inOutMode: 'in' | 'out'

  // Metadata
  synced: boolean // Si ya fue sincronizado con el sistema
  syncedAt?: string
  createdAt: string
}

/**
 * Estadísticas del dispositivo
 */
export interface DeviceStats {
  deviceId: string
  institutionId: string

  totalRecords: number // Total de registros de asistencia
  recordsToday: number // Registros hoy
  recordsThisWeek: number
  recordsThisMonth: number

  averageResponseTime: number // ms
  uptime: number // porcentaje
  lastErrorCount: number // errores en últimas 24h

  updatedAt: string
}
