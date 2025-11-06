/**
 * Schedule entity types
 * Represents work schedules and shifts
 */

export enum DayOfWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export enum ShiftType {
  MORNING = "MORNING", // Mañana
  AFTERNOON = "AFTERNOON", // Tarde
  NIGHT = "NIGHT", // Noche
  FULL_DAY = "FULL_DAY", // Jornada completa
  SPLIT = "SPLIT", // Partido (morning + afternoon with break)
}

export interface TimeSlot {
  startTime: string; // HH:MM format (24h)
  endTime: string; // HH:MM format (24h)
}

export interface WorkDay {
  day: DayOfWeek;
  shifts: TimeSlot[];
  isWorkDay: boolean;
}

export interface Schedule {
  id: string;
  name: string;
  description?: string;
  shiftType: ShiftType;
  workDays: WorkDay[];
  toleranceMinutes: number; // Minutes of tolerance for late arrival
  breakDuration?: number; // Break duration in minutes
  totalWeeklyHours: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateScheduleDTO {
  name: string;
  description?: string;
  shiftType: ShiftType;
  workDays: WorkDay[];
  toleranceMinutes?: number;
  breakDuration?: number;
}

export interface UpdateScheduleDTO extends Partial<CreateScheduleDTO> {
  isActive?: boolean;
}

// Common schedule templates
export const SCHEDULE_TEMPLATES = {
  STANDARD_MORNING: {
    name: "Turno Mañana Estándar",
    shiftType: ShiftType.MORNING,
    workDays: [
      DayOfWeek.MONDAY,
      DayOfWeek.TUESDAY,
      DayOfWeek.WEDNESDAY,
      DayOfWeek.THURSDAY,
      DayOfWeek.FRIDAY,
    ].map((day) => ({
      day,
      shifts: [{ startTime: "08:00", endTime: "13:00" }],
      isWorkDay: true,
    })),
    toleranceMinutes: 15,
  },
  STANDARD_AFTERNOON: {
    name: "Turno Tarde Estándar",
    shiftType: ShiftType.AFTERNOON,
    workDays: [
      DayOfWeek.MONDAY,
      DayOfWeek.TUESDAY,
      DayOfWeek.WEDNESDAY,
      DayOfWeek.THURSDAY,
      DayOfWeek.FRIDAY,
    ].map((day) => ({
      day,
      shifts: [{ startTime: "14:00", endTime: "19:00" }],
      isWorkDay: true,
    })),
    toleranceMinutes: 15,
  },
  FULL_TIME: {
    name: "Jornada Completa",
    shiftType: ShiftType.FULL_DAY,
    workDays: [
      DayOfWeek.MONDAY,
      DayOfWeek.TUESDAY,
      DayOfWeek.WEDNESDAY,
      DayOfWeek.THURSDAY,
      DayOfWeek.FRIDAY,
    ].map((day) => ({
      day,
      shifts: [
        { startTime: "08:00", endTime: "12:00" },
        { startTime: "14:00", endTime: "18:00" },
      ],
      isWorkDay: true,
    })),
    toleranceMinutes: 15,
    breakDuration: 120, // 2 hours lunch break
  },
} as const;
