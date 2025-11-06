/**
 * Dependencia entity types
 * Represents departments, faculties, offices, institutes within the university
 */

export enum DependenciaType {
  FACULTAD = "FACULTAD",
  DEPARTAMENTO = "DEPARTAMENTO",
  OFICINA = "OFICINA",
  INSTITUTO = "INSTITUTO",
  DIRECCION = "DIRECCION",
  UNIDAD = "UNIDAD",
}

export interface Dependencia {
  id: string;
  code: string; // Código único (ej: "FAC-ING", "DEPT-SIST")
  name: string;
  type: DependenciaType;
  /**
   * Reference to sede (campus)
   */
  sedeId: string;
  sedeName?: string;
  /**
   * ID of the user who manages this dependencia
   */
  managerId?: string;
  managerName?: string;
  /**
   * Parent dependencia for hierarchy (ej: Departamento -> Facultad)
   */
  parentId?: string;
  parentName?: string;
  /**
   * For hierarchical display
   */
  level?: number;
  children?: Dependencia[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDependenciaDTO {
  code: string;
  name: string;
  type: DependenciaType;
  sedeId: string;
  managerId?: string;
  parentId?: string;
}

export interface UpdateDependenciaDTO extends Partial<CreateDependenciaDTO> {
  isActive?: boolean;
}

/**
 * Labels for dependencia types
 */
export const DEPENDENCIA_TYPE_LABELS: Record<DependenciaType, string> = {
  [DependenciaType.FACULTAD]: "Facultad",
  [DependenciaType.DEPARTAMENTO]: "Departamento",
  [DependenciaType.OFICINA]: "Oficina",
  [DependenciaType.INSTITUTO]: "Instituto",
  [DependenciaType.DIRECCION]: "Dirección",
  [DependenciaType.UNIDAD]: "Unidad",
};
