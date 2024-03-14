import { Subtask } from './subtask.model';
import { Tag } from './tag.interface';
import { User } from './user.model';

export interface Task {
  id: string;
  title: string;
  description: string;
  columnName?: string;
  columnId: string;
  order: number;
  subtasks: Subtask[];
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
  user?: User;
}
