// Types
export type {
  ZKTecoDevice,
  DeviceSyncLog,
  AttendanceRecord,
  DeviceStats,
  DeviceStatus,
  DeviceType,
} from './model/types'

// Mock data and functions
export {
  MOCK_DEVICES,
  MOCK_SYNC_LOGS,
  MOCK_DEVICE_STATS,
  getDeviceById,
  getDevicesByInstitution,
  getAllDevices,
  getDeviceStats,
  getSyncLogsByDevice,
  getSyncLogsByInstitution,
} from './model/mock-devices'
