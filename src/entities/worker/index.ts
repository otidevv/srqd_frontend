export {
  ContractType,
  WorkerStatus,
  Department,
  type Worker,
  type CreateWorkerDTO,
  type UpdateWorkerDTO,
} from "./model/types";

export {
  MOCK_WORKERS,
  getAllWorkers,
  getWorkerById,
  getWorkersByDepartment,
  getWorkersByStatus,
} from "./model/mock-workers";
