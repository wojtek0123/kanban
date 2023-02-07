import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Board } from '../models/board.model';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class BoardService {
  selectedColumnId = new BehaviorSubject<string>('');
  selectedTaskId = new BehaviorSubject<string>('');
  selectedBoard = new BehaviorSubject<Board | undefined>(undefined);
  selectedProject = new BehaviorSubject<Project | undefined>(undefined);

  onChangeSelectedProject(project: Project) {
    this.selectedProject.next(project);
  }

  onChangeSelectedBoard(board: Board | undefined) {
    this.selectedBoard.next(board);
  }

  onChangeSelectedColumnId(columnId: string) {
    this.selectedColumnId.next(columnId);
  }

  onChangeSelectedTaskId(taskId: string) {
    this.selectedTaskId.next(taskId);
  }

  refreshBoard(projects: Project[]) {
    const projectsWithSearchBoard = projects.map(project =>
      project.boards.filter(board => board.id === this.selectedBoard.value?.id)
    );

    const clearedProjectsFromEmptyArray = projectsWithSearchBoard.filter(
      board => board.length !== 0
    );

    this.onChangeSelectedBoard(clearedProjectsFromEmptyArray[0][0]);
  }
}
