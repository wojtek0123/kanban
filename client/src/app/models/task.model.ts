import { Subtask } from './subtask.model';

export interface Task {
  id: string;
  title: string;
  description: string;
  tagNames: string[];
  tagFontColors: string[];
  tagBackgroundColors: string[];
  columnName?: string;
  columnId: string;
  subtasks: Subtask[];
  createdAt: Date;
  updatedAt: Date;
}
