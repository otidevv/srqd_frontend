/**
 * Schedules API
 * Mock implementation for schedule management
 */

import type { Schedule, CreateScheduleDTO, UpdateScheduleDTO, ShiftType } from "@/entities/schedule";
import { SCHEDULE_TEMPLATES } from "@/entities/schedule";

// Mock schedules data
const MOCK_SCHEDULES: Schedule[] = [
  {
    id: "1",
    ...SCHEDULE_TEMPLATES.STANDARD_MORNING,
    totalWeeklyHours: 25,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    ...SCHEDULE_TEMPLATES.STANDARD_AFTERNOON,
    totalWeeklyHours: 25,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    ...SCHEDULE_TEMPLATES.FULL_TIME,
    totalWeeklyHours: 40,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

/**
 * Get all schedules
 */
export async function getSchedules(): Promise<Schedule[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...MOCK_SCHEDULES];
}

/**
 * Get schedule by ID
 */
export async function getScheduleById(id: string): Promise<Schedule | null> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const schedule = MOCK_SCHEDULES.find(s => s.id === id);
  return schedule || null;
}

/**
 * Create new schedule
 */
export async function createSchedule(data: CreateScheduleDTO): Promise<Schedule> {
  await new Promise(resolve => setTimeout(resolve, 500));

  // Calculate total weekly hours
  const totalWeeklyHours = data.workDays.reduce((total, workDay) => {
    if (!workDay.isWorkDay) return total;

    const dayHours = workDay.shifts.reduce((dayTotal, shift) => {
      const [startHour, startMin] = shift.startTime.split(':').map(Number);
      const [endHour, endMin] = shift.endTime.split(':').map(Number);
      const hours = (endHour * 60 + endMin - startHour * 60 - startMin) / 60;
      return dayTotal + hours;
    }, 0);

    return total + dayHours;
  }, 0);

  const newSchedule: Schedule = {
    id: String(Date.now()),
    ...data,
    toleranceMinutes: data.toleranceMinutes || 15,
    totalWeeklyHours,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  MOCK_SCHEDULES.push(newSchedule);
  return newSchedule;
}

/**
 * Update schedule
 */
export async function updateSchedule(id: string, data: UpdateScheduleDTO): Promise<Schedule> {
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = MOCK_SCHEDULES.findIndex(s => s.id === id);
  if (index === -1) {
    throw new Error("Horario no encontrado");
  }

  // Recalculate total weekly hours if workDays changed
  let totalWeeklyHours = MOCK_SCHEDULES[index].totalWeeklyHours;
  if (data.workDays) {
    totalWeeklyHours = data.workDays.reduce((total, workDay) => {
      if (!workDay.isWorkDay) return total;

      const dayHours = workDay.shifts.reduce((dayTotal, shift) => {
        const [startHour, startMin] = shift.startTime.split(':').map(Number);
        const [endHour, endMin] = shift.endTime.split(':').map(Number);
        const hours = (endHour * 60 + endMin - startHour * 60 - startMin) / 60;
        return dayTotal + hours;
      }, 0);

      return total + dayHours;
    }, 0);
  }

  const updatedSchedule: Schedule = {
    ...MOCK_SCHEDULES[index],
    ...data,
    totalWeeklyHours,
    updatedAt: new Date().toISOString(),
  };

  MOCK_SCHEDULES[index] = updatedSchedule;
  return updatedSchedule;
}

/**
 * Delete schedule
 */
export async function deleteSchedule(id: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 500));

  const index = MOCK_SCHEDULES.findIndex(s => s.id === id);
  if (index === -1) {
    throw new Error("Horario no encontrado");
  }

  MOCK_SCHEDULES.splice(index, 1);
}

/**
 * Get schedule templates
 */
export function getScheduleTemplates() {
  return SCHEDULE_TEMPLATES;
}

/**
 * Schedules API object
 */
export const schedulesApi = {
  getSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getTemplates: getScheduleTemplates,
};
