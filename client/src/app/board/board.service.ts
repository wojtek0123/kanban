import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BoardService {
  selectedProjectId = new BehaviorSubject<string>('');
  selectedBoardId = new BehaviorSubject<string>('');
  selectedColumnId = new BehaviorSubject<string>('');
  selectedTaskId = new BehaviorSubject<string>('');

  onChangeSelectedProject(projectId: string) {
    this.selectedProjectId.next(projectId);
  }

  onChangeSelectedBoard(boardId: string) {
    this.selectedBoardId.next(boardId);
  }

  onChangeSelectedColumn(columnId: string) {
    this.selectedColumnId.next(columnId);
  }

  onChangeSelectedTask(taskId: string) {
    this.selectedTaskId.next(taskId);
  }
}
