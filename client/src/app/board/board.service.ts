import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Board, Project } from '../types';

@Injectable({ providedIn: 'root' })
export class BoardService {
  selectedProjectId = new BehaviorSubject<string>('');
  // selectedBoardId = new BehaviorSubject<string>('');
  selectedColumnId = new BehaviorSubject<string>('');
  selectedTaskId = new BehaviorSubject<string>('');
  selectedBoard = new BehaviorSubject<Board | undefined>(undefined);

  onChangeSelectedBoard(board: Board | undefined) {
    this.selectedBoard.next(board);
    // this.s
  }

  onChangeSelectedProjectId(projectId: string) {
    this.selectedProjectId.next(projectId);
  }

  // onChangeSelectedBoardId(boardId: string) {
  //   this.selectedBoardId.next(boardId);
  // }

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
