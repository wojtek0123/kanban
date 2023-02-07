import { Column } from './column.model';

export interface Board {
  id: string;
  name: string;
  columns: Column[];
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}
