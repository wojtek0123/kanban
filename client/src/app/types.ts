export interface Subtask {
  id: string;
  name: string;
  isFinished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  tagNames: string[];
  tagFontColors: string[];
  tagBackgroundColors: string[];
  subtasks: Subtask[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: string;
  name: string;
  dotColor: string;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Board {
  id: string;
  name: string;
  columns: Column[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  boards: Board[];
  createdAt: Date;
  updatedAt: Date;
}

export type FormType = 'project' | 'board' | 'task' | 'column' | 'subtask';
