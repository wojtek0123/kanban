import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Board, Project } from './board.component';

@Injectable({ providedIn: 'root' })
export class BoardService {
  selectedProject: Project | undefined;
  selectedBoard = new BehaviorSubject<Board>({
    name: 'Please select board',
    id: '',
    columns: [],
  });
  selectedProjectId = new BehaviorSubject<string>('');
  selectedBoardId = new BehaviorSubject<string>('');
  selectedColumnId = new BehaviorSubject<string>('');
  selectedTaskId = new BehaviorSubject<string>('');
  projects = new BehaviorSubject<Project[]>([]);

  onSetProjects(projects: Project[]) {
    this.projects.next(projects);
  }

  onChangeSelectedProject(projectId: string) {
    this.selectedProject = this.projects.value.find(
      project => project.id === projectId
    );
  }

  onChangeSelectedProjectId(projectId: string) {
    this.selectedProjectId.next(projectId);
  }

  onChangeSelectedBoard(boardId: string) {
    this.selectedBoardId.next(boardId);

    const boards = this.projects.value.map(project =>
      project.boards.find(board => board.id === boardId)
    );

    const board = boards.find(board => board?.id === boardId);
    if (board) {
      this.selectedBoard.next(board);
    }
  }

  onChangeSelectedColumn(columnId: string) {
    this.selectedColumnId.next(columnId);
  }

  onChangeSelectedTask(taskId: string) {
    this.selectedTaskId.next(taskId);
  }
}
