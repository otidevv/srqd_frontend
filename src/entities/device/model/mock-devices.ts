import type { ZKTecoDevice, DeviceSyncLog, DeviceStats } from './types'

/**
 * Mock database - Dispositivos ZKTeco
 */
export const MOCK_DEVICES: ZKTecoDevice[] = [
  // Colegio Milgras
  {
    id: 'dev-001',
    name: 'ZKTeco Entrada Principal - Milgras',
    serialNumber: 'ZK2024001234',
    model: 'ZK-K40',
    type: 'hybrid',
    institutionId: 'milgras',
    institutionName: 'Colegio Milgras',
    subdomain: 'milgras',
    ipAddress: '192.168.1.100',
    port: 4370,
    status: 'online',
    lastSync: '2025-10-13T08:30:00Z',
    lastSeen: '2025-10-13T08:35:00Z',
    location: 'Entrada Principal - Puerta 1',
    description: 'Control de asistencia de estudiantes y personal',
    maxUsers: 3000,
    maxFingerprints: 10000,
    currentUsers: 856,
    apiKey: 'mk_test_milgras_001',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2025-10-13T08:30:00Z',
    createdBy: 'admin@default.edu.pe',
  },
  {
    id: 'dev-002',
    name: 'ZKTeco Edificio Secundaria - Milgras',
    serialNumber: 'ZK2024001235',
    model: 'ZK-F18',
    type: 'fingerprint',
    institutionId: 'milgras',
    institutionName: 'Colegio Milgras',
    subdomain: 'milgras',
    ipAddress: '192.168.1.101',
    port: 4370,
    status: 'online',
    lastSync: '2025-10-13T08:28:00Z',
    lastSeen: '2025-10-13T08:35:00Z',
    location: 'Edificio Secundaria - Piso 2',
    description: 'Control para docentes de secundaria',
    maxUsers: 500,
    maxFingerprints: 3000,
    currentUsers: 45,
    apiKey: 'mk_test_milgras_002',
    createdAt: '2024-02-10T00:00:00Z',
    updatedAt: '2025-10-13T08:28:00Z',
    createdBy: 'admin@default.edu.pe',
  },

  // Colegio Santa Rosa
  {
    id: 'dev-003',
    name: 'ZKTeco Portería - Santa Rosa',
    serialNumber: 'ZK2024002100',
    model: 'ZK-MB560',
    type: 'facial',
    institutionId: 'santarosa',
    institutionName: 'Colegio Santa Rosa de Lima',
    subdomain: 'santarosa',
    ipAddress: '192.168.2.50',
    port: 4370,
    status: 'online',
    lastSync: '2025-10-13T08:32:00Z',
    lastSeen: '2025-10-13T08:35:00Z',
    location: 'Portería Principal',
    description: 'Sistema de reconocimiento facial',
    maxUsers: 5000,
    maxFingerprints: 0,
    currentUsers: 1234,
    apiKey: 'mk_test_santarosa_001',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2025-10-13T08:32:00Z',
    createdBy: 'admin@default.edu.pe',
  },
  {
    id: 'dev-004',
    name: 'ZKTeco Sala de Profesores - Santa Rosa',
    serialNumber: 'ZK2024002101',
    model: 'ZK-K40',
    type: 'hybrid',
    institutionId: 'santarosa',
    institutionName: 'Colegio Santa Rosa de Lima',
    subdomain: 'santarosa',
    ipAddress: '192.168.2.51',
    port: 4370,
    status: 'offline',
    lastSync: '2025-10-12T18:45:00Z',
    lastSeen: '2025-10-12T23:12:00Z',
    location: 'Sala de Profesores - Piso 3',
    description: 'Control de asistencia docente',
    maxUsers: 200,
    maxFingerprints: 600,
    currentUsers: 78,
    apiKey: 'mk_test_santarosa_002',
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2025-10-12T18:45:00Z',
    createdBy: 'admin@default.edu.pe',
  },

  // Dispositivo con error para testing
  {
    id: 'dev-005',
    name: 'ZKTeco Biblioteca - Santa Rosa',
    serialNumber: 'ZK2024002102',
    model: 'ZK-X628',
    type: 'rfid',
    institutionId: 'santarosa',
    institutionName: 'Colegio Santa Rosa de Lima',
    subdomain: 'santarosa',
    ipAddress: '192.168.2.52',
    port: 4370,
    status: 'error',
    lastSync: '2025-10-10T14:20:00Z',
    lastSeen: '2025-10-10T14:20:00Z',
    location: 'Biblioteca',
    description: 'Control RFID - Requiere mantenimiento',
    maxUsers: 1000,
    maxFingerprints: 0,
    currentUsers: 0,
    apiKey: 'mk_test_santarosa_003',
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2025-10-10T14:20:00Z',
    createdBy: 'admin@default.edu.pe',
  },
]

/**
 * Mock sync logs
 */
export const MOCK_SYNC_LOGS: DeviceSyncLog[] = [
  {
    id: 'log-001',
    deviceId: 'dev-001',
    deviceName: 'ZKTeco Entrada Principal - Milgras',
    institutionId: 'milgras',
    syncType: 'attendance',
    status: 'success',
    recordsProcessed: 245,
    recordsFailed: 0,
    startedAt: '2025-10-13T08:30:00Z',
    completedAt: '2025-10-13T08:30:15Z',
    duration: 15,
  },
  {
    id: 'log-002',
    deviceId: 'dev-003',
    deviceName: 'ZKTeco Portería - Santa Rosa',
    institutionId: 'santarosa',
    syncType: 'attendance',
    status: 'success',
    recordsProcessed: 378,
    recordsFailed: 0,
    startedAt: '2025-10-13T08:32:00Z',
    completedAt: '2025-10-13T08:32:22Z',
    duration: 22,
  },
  {
    id: 'log-003',
    deviceId: 'dev-004',
    deviceName: 'ZKTeco Sala de Profesores - Santa Rosa',
    institutionId: 'santarosa',
    syncType: 'attendance',
    status: 'error',
    recordsProcessed: 0,
    recordsFailed: 0,
    startedAt: '2025-10-12T18:45:00Z',
    completedAt: '2025-10-12T18:45:30Z',
    duration: 30,
    errorMessage: 'No se pudo conectar al dispositivo. Timeout después de 30s.',
  },
]

/**
 * Mock device stats
 */
export const MOCK_DEVICE_STATS: Record<string, DeviceStats> = {
  'dev-001': {
    deviceId: 'dev-001',
    institutionId: 'milgras',
    totalRecords: 45678,
    recordsToday: 245,
    recordsThisWeek: 1823,
    recordsThisMonth: 7456,
    averageResponseTime: 120,
    uptime: 99.2,
    lastErrorCount: 0,
    updatedAt: '2025-10-13T08:30:00Z',
  },
  'dev-003': {
    deviceId: 'dev-003',
    institutionId: 'santarosa',
    totalRecords: 78234,
    recordsToday: 378,
    recordsThisWeek: 2567,
    recordsThisMonth: 10234,
    averageResponseTime: 95,
    uptime: 98.8,
    lastErrorCount: 0,
    updatedAt: '2025-10-13T08:32:00Z',
  },
  'dev-004': {
    deviceId: 'dev-004',
    institutionId: 'santarosa',
    totalRecords: 12456,
    recordsToday: 0,
    recordsThisWeek: 234,
    recordsThisMonth: 1023,
    averageResponseTime: 0,
    uptime: 87.5,
    lastErrorCount: 12,
    updatedAt: '2025-10-12T18:45:00Z',
  },
}

/**
 * Get device by ID
 */
export function getDeviceById(id: string): ZKTecoDevice | null {
  return MOCK_DEVICES.find((device) => device.id === id) || null
}

/**
 * Get devices by institution
 */
export function getDevicesByInstitution(institutionId: string): ZKTecoDevice[] {
  return MOCK_DEVICES.filter((device) => device.institutionId === institutionId)
}

/**
 * Get all devices
 */
export function getAllDevices(): ZKTecoDevice[] {
  return MOCK_DEVICES
}

/**
 * Get device stats
 */
export function getDeviceStats(deviceId: string): DeviceStats | null {
  return MOCK_DEVICE_STATS[deviceId] || null
}

/**
 * Get sync logs by device
 */
export function getSyncLogsByDevice(deviceId: string): DeviceSyncLog[] {
  return MOCK_SYNC_LOGS.filter((log) => log.deviceId === deviceId)
}

/**
 * Get sync logs by institution
 */
export function getSyncLogsByInstitution(institutionId: string): DeviceSyncLog[] {
  return MOCK_SYNC_LOGS.filter((log) => log.institutionId === institutionId)
}
