import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BoardService {
  selectedBoardId = new BehaviorSubject<string>('');
  selectedColumnId = new BehaviorSubject<string>('');
  selectedTaskId = new BehaviorSubject<string>('');

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
