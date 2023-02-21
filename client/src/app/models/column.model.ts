import { Task } from './task.model';

export interface Column {
  id: string;
  name: string;
  dotColor: string;
  tasks: Task[];
  columnWrapperId: string;
  createdAt: Date;
  updatedAt: Date;
}
