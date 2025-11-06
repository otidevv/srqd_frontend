import type { User } from "./types";

/**
 * Mock users database
 * In production, this would come from your backend API
 */
export const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "defensoria@unamad.edu.pe",
    name: "Defensor Universitario",
    role: "admin",
    status: "active",
    phone: "+51 986 092 679",
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: "2025-01-29T10:00:00Z",
  },
  {
    id: "2",
    email: "admin@unamad.edu.pe",
    name: "Administrador UNAMAD",
    role: "admin",
    status: "active",
    phone: "+51 982 123 456",
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: "2025-01-20T10:30:00Z",
  },
  {
    id: "3",
    email: "supervisor@unamad.edu.pe",
    name: "María González Quispe",
    role: "supervisor",
    status: "active",
    phone: "+51 982 234 567",
    createdAt: "2024-01-15T00:00:00Z",
    lastLogin: "2025-01-19T15:45:00Z",
  },
  {
    id: "4",
    email: "operador1@unamad.edu.pe",
    name: "Carlos Ramírez Torres",
    role: "operator",
    status: "active",
    phone: "+51 982 345 678",
    createdAt: "2024-02-01T00:00:00Z",
    lastLogin: "2025-01-20T08:15:00Z",
  },
  {
    id: "5",
    email: "operador2@unamad.edu.pe",
    name: "Ana Flores Mendoza",
    role: "operator",
    status: "active",
    phone: "+51 982 456 789",
    createdAt: "2024-02-10T00:00:00Z",
    lastLogin: "2025-01-18T14:20:00Z",
  },
  {
    id: "6",
    email: "demo@unamad.edu.pe",
    name: "Usuario Demo",
    role: "admin",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
  },
];

/**
 * Mock passwords (NEVER do this in production!)
 * In production, passwords should be hashed and stored securely
 */
export const MOCK_PASSWORDS: Record<string, string> = {
  "defensoria@unamad.edu.pe": "defensoria123",
  "admin@unamad.edu.pe": "admin123",
  "supervisor@unamad.edu.pe": "supervisor123",
  "operador1@unamad.edu.pe": "operador123",
  "operador2@unamad.edu.pe": "operador123",
  "demo@unamad.edu.pe": "demo123",
};

/**
 * Get user by email (mock)
 */
export function getUserByEmail(email: string): User | null {
  return MOCK_USERS.find(user => user.email === email) || null;
}

/**
 * Get all users (mock)
 */
export function getAllUsers(): User[] {
  return MOCK_USERS;
}

/**
 * Validate user credentials (mock)
 */
export function validateCredentials(email: string, password: string): boolean {
  return MOCK_PASSWORDS[email] === password;
}
