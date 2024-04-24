export interface WorksCategory {
  id: number;
  name: string;
  workTypes: WorksType[];
}

export interface WorksType {
  id: number;
  name: string;
}
