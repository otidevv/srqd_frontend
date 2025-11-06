/**
 * Attendance entity types
 * Represents attendance records from ZKTeco devices
 */

export enum AttendanceStatus {
  PRESENT = "PRESENT", // On time
  LATE = "LATE", // Arrived late
  ABSENT = "ABSENT", // Did not attend
  EXCUSED = "EXCUSED", // Justified absence
  EARLY_DEPARTURE = "EARLY_DEPARTURE", // Left early
}

export enum AttendanceType {
  CHECK_IN = "CHECK_IN", // Entry
  CHECK_OUT = "CHECK_OUT", // Exit
  BREAK_START = "BREAK_START", // Break start
  BREAK_END = "BREAK_END", // Break end
}

export interface AttendanceRecord {
  id: string;
  workerId: string;
  deviceId: string; // ZKTeco device serial number
  deviceUserId: string; // User ID in ZKTeco device
  timestamp: string; // ISO datetime from device
  type: AttendanceType;
  status: AttendanceStatus;
  latitude?: number; // GPS coordinates (if available)
  longitude?: number;
  temperature?: number; // Temperature reading (if device supports it)
  photo?: string; // Face photo URL (if captured)
  verifyMode: string; // "fingerprint", "face", "card", "password"
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceSummary {
  workerId: string;
  date: string; // ISO date (YYYY-MM-DD)
  checkIn?: string; // ISO datetime
  checkOut?: string; // ISO datetime
  status: AttendanceStatus;
  hoursWorked?: number;
  lateMinutes?: number;
  earlyDepartureMinutes?: number;
  notes?: string;
}

export interface AttendanceReport {
  workerId: string;
  workerName: string;
  period: {
    startDate: string;
    endDate: string;
  };
  totalDays: number;
  presentDays: number;
  lateDays: number;
  absentDays: number;
  excusedDays: number;
  totalHours: number;
  averageHoursPerDay: number;
  records: AttendanceSummary[];
}

export interface CreateAttendanceDTO {
  workerId: string;
  deviceId: string;
  deviceUserId: string;
  timestamp: string;
  type: AttendanceType;
  verifyMode: string;
  latitude?: number;
  longitude?: number;
  temperature?: number;
  photo?: string;
}
