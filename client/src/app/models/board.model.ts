import { ColumnWrapper } from './columnWrapper.model';

export interface Board {
  id: string;
  name: string;
  columns: ColumnWrapper[];
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}
