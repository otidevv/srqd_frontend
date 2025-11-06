/**
 * ZKTeco API
 * Mock implementation for ZKTeco device integration
 */

export interface ZKTecoDevice {
  id: string;
  serialNumber: string;
  name: string;
  ipAddress: string;
  port: number;
  model: string;
  status: "online" | "offline";
  lastSync?: string;
  totalUsers: number;
  totalRecords: number;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeviceUser {
  deviceUserId: string;
  name: string;
  privilege: number; // 0=User, 1=Enroller, 2=Manager, 3=Admin
  password?: string;
  cardNumber?: string;
  fingerprints?: number[]; // Finger indices that have enrolled prints
  faceData?: boolean;
}

export interface SyncResult {
  success: boolean;
  deviceId: string;
  recordsSynced: number;
  usersUpdated: number;
  errors: string[];
  syncedAt: string;
}

// Mock devices
const MOCK_DEVICES: ZKTecoDevice[] = [
  {
    id: "1",
    serialNumber: "ZKDEV001",
    name: "Dispositivo Principal - Entrada",
    ipAddress: "192.168.1.100",
    port: 4370,
    model: "ZKTeco K40",
    status: "online",
    totalUsers: 0,
    totalRecords: 0,
    location: "Edificio Principal - Puerta Principal",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    serialNumber: "ZKDEV002",
    name: "Dispositivo Secundario - Área Administrativa",
    ipAddress: "192.168.1.101",
    port: 4370,
    model: "ZKTeco MB460",
    status: "offline",
    totalUsers: 0,
    totalRecords: 0,
    location: "Edificio Administrativo - 2do Piso",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

/**
 * Get all ZKTeco devices
 */
export async function getDevices(): Promise<ZKTecoDevice[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...MOCK_DEVICES];
}

/**
 * Get device by ID
 */
export async function getDeviceById(id: string): Promise<ZKTecoDevice | null> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const device = MOCK_DEVICES.find(d => d.id === id);
  return device || null;
}

/**
 * Test device connection
 */
export async function testDeviceConnection(deviceId: string): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const device = MOCK_DEVICES.find(d => d.id === deviceId);
  if (!device) {
    throw new Error("Dispositivo no encontrado");
  }

  // Mock: Random success/failure
  return Math.random() > 0.2;
}

/**
 * Sync attendance records from device
 */
export async function syncAttendance(deviceId: string): Promise<SyncResult> {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const device = MOCK_DEVICES.find(d => d.id === deviceId);
  if (!device) {
    throw new Error("Dispositivo no encontrado");
  }

  if (device.status === "offline") {
    return {
      success: false,
      deviceId,
      recordsSynced: 0,
      usersUpdated: 0,
      errors: ["Dispositivo fuera de línea"],
      syncedAt: new Date().toISOString(),
    };
  }

  // Mock: Simulate sync
  const recordsSynced = Math.floor(Math.random() * 50);
  device.lastSync = new Date().toISOString();
  device.totalRecords += recordsSynced;

  return {
    success: true,
    deviceId,
    recordsSynced,
    usersUpdated: 0,
    errors: [],
    syncedAt: new Date().toISOString(),
  };
}

/**
 * Enroll worker in device
 */
export async function enrollWorker(
  deviceId: string,
  workerId: string,
  userData: Partial<DeviceUser>
): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const device = MOCK_DEVICES.find(d => d.id === deviceId);
  if (!device) {
    throw new Error("Dispositivo no encontrado");
  }

  if (device.status === "offline") {
    throw new Error("Dispositivo fuera de línea");
  }

  // Mock: Increment users
  device.totalUsers += 1;
  console.log(`Worker enrolled in device ${deviceId}:`, userData);
}

/**
 * Remove worker from device
 */
export async function removeWorkerFromDevice(
  deviceId: string,
  deviceUserId: string
): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const device = MOCK_DEVICES.find(d => d.id === deviceId);
  if (!device) {
    throw new Error("Dispositivo no encontrado");
  }

  if (device.status === "offline") {
    throw new Error("Dispositivo fuera de línea");
  }

  // Mock: Decrement users
  if (device.totalUsers > 0) {
    device.totalUsers -= 1;
  }
  console.log(`Worker removed from device ${deviceId}: ${deviceUserId}`);
}

/**
 * Get all users from device
 */
export async function getDeviceUsers(deviceId: string): Promise<DeviceUser[]> {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const device = MOCK_DEVICES.find(d => d.id === deviceId);
  if (!device) {
    throw new Error("Dispositivo no encontrado");
  }

  // Mock: Return empty array
  return [];
}

/**
 * Clear all attendance records from device
 */
export async function clearDeviceRecords(deviceId: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const device = MOCK_DEVICES.find(d => d.id === deviceId);
  if (!device) {
    throw new Error("Dispositivo no encontrado");
  }

  device.totalRecords = 0;
  console.log(`Cleared all records from device ${deviceId}`);
}

/**
 * Sync device time with server
 */
export async function syncDeviceTime(deviceId: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 500));

  const device = MOCK_DEVICES.find(d => d.id === deviceId);
  if (!device) {
    throw new Error("Dispositivo no encontrado");
  }

  console.log(`Synced time with device ${deviceId}`);
}

/**
 * Restart device
 */
export async function restartDevice(deviceId: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 3000));

  const device = MOCK_DEVICES.find(d => d.id === deviceId);
  if (!device) {
    throw new Error("Dispositivo no encontrado");
  }

  console.log(`Restarted device ${deviceId}`);
}

/**
 * ZKTeco API object
 */
export const zktecoApi = {
  getDevices,
  getDeviceById,
  testConnection: testDeviceConnection,
  syncAttendance,
  enrollWorker,
  removeWorker: removeWorkerFromDevice,
  getDeviceUsers,
  clearRecords: clearDeviceRecords,
  syncDeviceTime,
  restartDevice,
};
