/**
 * Sede entity types
 * Represents university campuses/locations
 */

export interface Sede {
  id: string;
  code: string; // Código único de la sede (ej: "SEDE-MD", "SEDE-IB")
  name: string;
  address: string;
  city: string;
  region: string;
  phone: string;
  email: string;
  /**
   * ID of the user who manages this sede
   */
  managerId?: string;
  managerName?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSedeDTO {
  code: string;
  name: string;
  address: string;
  city: string;
  region: string;
  phone: string;
  email: string;
  managerId?: string;
}

export interface UpdateSedeDTO extends Partial<CreateSedeDTO> {
  isActive?: boolean;
}
