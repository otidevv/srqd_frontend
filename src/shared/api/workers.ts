/**
 * Workers API
 * Mock implementation for worker management
 */

import type { Worker, CreateWorkerDTO, UpdateWorkerDTO, ContractType, WorkerStatus } from "@/entities/worker";

// Mock workers data
const MOCK_WORKERS: Worker[] = [
  {
    id: "1",
    dni: "12345678",
    firstName: "Juan",
    lastName: "Pérez López",
    email: "juan.perez@unamad.edu.pe",
    phone: "+51 982 111 222",
    contractType: "CAS" as ContractType,
    status: "ACTIVE" as WorkerStatus,
    department: "ADMINISTRACION" as any,
    position: "Asistente Administrativo",
    hireDate: "2023-01-15",
    createdAt: "2023-01-10T00:00:00Z",
    updatedAt: "2023-01-10T00:00:00Z",
    deviceUserId: "001",
  },
  {
    id: "2",
    dni: "87654321",
    firstName: "María",
    lastName: "González Quispe",
    email: "maria.gonzalez@unamad.edu.pe",
    phone: "+51 982 222 333",
    contractType: "NOMBRADO" as ContractType,
    status: "ACTIVE" as WorkerStatus,
    department: "ACADEMICO" as any,
    position: "Docente",
    hireDate: "2020-03-01",
    createdAt: "2020-02-25T00:00:00Z",
    updatedAt: "2020-02-25T00:00:00Z",
    deviceUserId: "002",
  },
  {
    id: "3",
    dni: "11223344",
    firstName: "Carlos",
    lastName: "Ramírez Torres",
    email: "carlos.ramirez@unamad.edu.pe",
    phone: "+51 982 333 444",
    contractType: "LOCACION" as ContractType,
    status: "ACTIVE" as WorkerStatus,
    department: "MANTENIMIENTO" as any,
    position: "Técnico de Mantenimiento",
    hireDate: "2024-01-01",
    endDate: "2024-12-31",
    createdAt: "2023-12-20T00:00:00Z",
    updatedAt: "2023-12-20T00:00:00Z",
  },
];

export interface GetWorkersParams {
  contractType?: ContractType;
  status?: WorkerStatus;
  department?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Get all workers with optional filters
 */
export async function getWorkers(params?: GetWorkersParams): Promise<PaginatedResponse<Worker>> {
  await new Promise(resolve => setTimeout(resolve, 500));

  let filteredWorkers = [...MOCK_WORKERS];

  // Apply filters
  if (params?.contractType) {
    filteredWorkers = filteredWorkers.filter(w => w.contractType === params.contractType);
  }
  if (params?.status) {
    filteredWorkers = filteredWorkers.filter(w => w.status === params.status);
  }
  if (params?.department) {
    filteredWorkers = filteredWorkers.filter(w => w.department === params.department);
  }
  if (params?.search) {
    const searchLower = params.search.toLowerCase();
    filteredWorkers = filteredWorkers.filter(w =>
      w.firstName.toLowerCase().includes(searchLower) ||
      w.lastName.toLowerCase().includes(searchLower) ||
      w.dni.includes(searchLower) ||
      w.email.toLowerCase().includes(searchLower)
    );
  }

  // Pagination
  const page = params?.page || 1;
  const limit = params?.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedWorkers = filteredWorkers.slice(startIndex, endIndex);

  return {
    data: paginatedWorkers,
    total: filteredWorkers.length,
    page,
    limit,
    totalPages: Math.ceil(filteredWorkers.length / limit),
  };
}

/**
 * Get worker by ID
 */
export async function getWorkerById(id: string): Promise<Worker | null> {
  await new Promise(resolve => setTimeout(resolve, 300));

  const worker = MOCK_WORKERS.find(w => w.id === id);
  return worker || null;
}

/**
 * Create new worker
 */
export async function createWorker(data: CreateWorkerDTO): Promise<Worker> {
  await new Promise(resolve => setTimeout(resolve, 500));

  const newWorker: Worker = {
    id: String(Date.now()),
    ...data,
    status: "ACTIVE" as WorkerStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  MOCK_WORKERS.push(newWorker);
  return newWorker;
}

/**
 * Update worker
 */
export async function updateWorker(id: string, data: UpdateWorkerDTO): Promise<Worker> {
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = MOCK_WORKERS.findIndex(w => w.id === id);
  if (index === -1) {
    throw new Error("Trabajador no encontrado");
  }

  const updatedWorker: Worker = {
    ...MOCK_WORKERS[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  MOCK_WORKERS[index] = updatedWorker;
  return updatedWorker;
}

/**
 * Delete worker
 */
export async function deleteWorker(id: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = MOCK_WORKERS.findIndex(w => w.id === id);
  if (index === -1) {
    throw new Error("Trabajador no encontrado");
  }

  MOCK_WORKERS.splice(index, 1);
}

/**
 * Sync worker to ZKTeco device
 */
export async function syncWorkerToDevice(workerId: string, deviceId: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const worker = MOCK_WORKERS.find(w => w.id === workerId);
  if (!worker) {
    throw new Error("Trabajador no encontrado");
  }

  // Mock: Assign device user ID
  if (!worker.deviceUserId) {
    worker.deviceUserId = String(Math.floor(Math.random() * 9000) + 1000);
    worker.updatedAt = new Date().toISOString();
  }

  console.log(`Worker ${worker.firstName} ${worker.lastName} synced to device ${deviceId}`);
}

/**
 * Workers API object
 */
export const workersApi = {
  getWorkers,
  getWorkerById,
  createWorker,
  updateWorker,
  deleteWorker,
  syncToDevice: syncWorkerToDevice,
};
