export interface Subtask {
  id: string;
  name: string;
  isFinished: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  tagNames: string[];
  tagFontColors: string[];
  tagBackgroundColors: string[];
  subtasks: Subtask[];
}

export interface Column {
  id: string;
  name: string;
  dotColor: string;
  tasks: Task[];
}

export interface Board {
  id: string;
  name: string;
  columns: Column[];
}

export interface Project {
  id: string;
  name: string;
  boards: Board[];
}

export type FormType = 'project' | 'board' | 'task' | 'column' | 'subtask';
