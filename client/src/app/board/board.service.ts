import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BoardService {
  selectedBoardId = new BehaviorSubject<string>('');

  onChangeSelectedBoard(boardId: string) {
    this.selectedBoardId.next(boardId);
  }
}
