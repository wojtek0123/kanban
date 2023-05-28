import { Task } from './task.model';

export interface Column {
  id: string;
  name: string;
  dotColor: string;
  tasks: Task[];
  boardId: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
