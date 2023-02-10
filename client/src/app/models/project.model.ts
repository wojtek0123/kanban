import { Board } from './board.model';

export interface Project {
  id: string;
  name: string;
  users: string[];
  userId: string;
  boards: Board[];
  createdAt: Date;
  updatedAt: Date;
}
