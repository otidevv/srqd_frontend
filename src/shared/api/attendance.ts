/**
 * Attendance API
 * Mock implementation for attendance management
 */

import type { AttendanceRecord, AttendanceSummary, AttendanceReport, CreateAttendanceDTO, AttendanceStatus, AttendanceType } from "@/entities/attendance";

// Mock attendance records
const MOCK_ATTENDANCE: AttendanceRecord[] = [];

export interface GetAttendanceParams {
  workerId?: string;
  deviceId?: string;
  startDate?: string;
  endDate?: string;
  type?: AttendanceType;
  status?: AttendanceStatus;
}

export interface AttendanceStats {
  totalRecords: number;
  presentToday: number;
  lateToday: number;
  absentToday: number;
  deviceOnline: number;
  deviceOffline: number;
}

/**
 * Get attendance records with filters
 */
export async function getAttendanceRecords(params?: GetAttendanceParams): Promise<AttendanceRecord[]> {
  await new Promise(resolve => setTimeout(resolve, 500));

  let filtered = [...MOCK_ATTENDANCE];

  if (params?.workerId) {
    filtered = filtered.filter(a => a.workerId === params.workerId);
  }
  if (params?.deviceId) {
    filtered = filtered.filter(a => a.deviceId === params.deviceId);
  }
  if (params?.startDate) {
    filtered = filtered.filter(a => a.timestamp >= params.startDate!);
  }
  if (params?.endDate) {
    filtered = filtered.filter(a => a.timestamp <= params.endDate!);
  }
  if (params?.type) {
    filtered = filtered.filter(a => a.type === params.type);
  }
  if (params?.status) {
    filtered = filtered.filter(a => a.status === params.status);
  }

  return filtered;
}

/**
 * Get attendance summary for a worker
 */
export async function getAttendanceSummary(
  workerId: string,
  startDate: string,
  endDate: string
): Promise<AttendanceSummary[]> {
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock implementation
  return [];
}

/**
 * Get attendance report for a worker
 */
export async function getWorkerReport(
  workerId: string,
  startDate: string,
  endDate: string
): Promise<AttendanceReport> {
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock implementation
  return {
    workerId,
    workerName: "Trabajador Mock",
    period: { startDate, endDate },
    totalDays: 0,
    presentDays: 0,
    lateDays: 0,
    absentDays: 0,
    excusedDays: 0,
    totalHours: 0,
    averageHoursPerDay: 0,
    records: [],
  };
}

/**
 * Get real-time attendance stats
 */
export async function getStats(): Promise<AttendanceStats> {
  await new Promise(resolve => setTimeout(resolve, 300));

  return {
    totalRecords: MOCK_ATTENDANCE.length,
    presentToday: 0,
    lateToday: 0,
    absentToday: 0,
    deviceOnline: 0,
    deviceOffline: 0,
  };
}

/**
 * Create manual attendance record
 */
export async function createAttendance(data: CreateAttendanceDTO): Promise<AttendanceRecord> {
  await new Promise(resolve => setTimeout(resolve, 500));

  const newRecord: AttendanceRecord = {
    id: String(Date.now()),
    ...data,
    status: "PRESENT" as AttendanceStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  MOCK_ATTENDANCE.push(newRecord);
  return newRecord;
}

/**
 * Export attendance report
 */
export async function exportReport(
  workerId: string,
  startDate: string,
  endDate: string,
  format: "pdf" | "xlsx"
): Promise<Blob> {
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock: Return empty blob
  return new Blob([], { type: format === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
}

/**
 * Attendance API object
 */
export const attendanceApi = {
  getAttendanceRecords,
  getAttendanceSummary,
  getWorkerReport,
  getStats,
  createAttendance,
  exportReport,
};
