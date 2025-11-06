/**
 * Worker entity types
 * Represents employees/workers in the university
 */

export enum ContractType {
  CAS = "CAS", // Contrato Administrativo de Servicios
  NOMBRADO = "NOMBRADO", // Permanent staff
  LOCACION = "LOCACION", // Service contract
  PRACTICANTE = "PRACTICANTE", // Intern
  OTRO = "OTRO", // Other
}

export enum WorkerStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  VACATION = "VACATION",
  SUSPENDED = "SUSPENDED",
}

export enum Department {
  ADMINISTRACION = "ADMINISTRACION",
  ACADEMICO = "ACADEMICO",
  INVESTIGACION = "INVESTIGACION",
  BIBLIOTECA = "BIBLIOTECA",
  MANTENIMIENTO = "MANTENIMIENTO",
  SEGURIDAD = "SEGURIDAD",
  LIMPIEZA = "LIMPIEZA",
  OTRO = "OTRO",
}

export interface Worker {
  id: string;
  dni: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contractType: ContractType;
  status: WorkerStatus;
  department: Department;
  position: string;
  hireDate: string; // ISO date string
  endDate?: string; // ISO date string (for temporary contracts)
  scheduleId?: string; // Reference to assigned schedule
  deviceUserId?: string; // ZKTeco device user ID
  createdAt: string;
  updatedAt: string;
}

export interface CreateWorkerDTO {
  dni: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contractType: ContractType;
  department: Department;
  position: string;
  hireDate: string;
  endDate?: string;
  scheduleId?: string;
}

export interface UpdateWorkerDTO extends Partial<CreateWorkerDTO> {
  status?: WorkerStatus;
  deviceUserId?: string;
}
