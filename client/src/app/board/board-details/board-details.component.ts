import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { Board } from '../board.component';
import { BoardService } from '../board.service';
import { FormService, FormType } from '../form/form.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css'],
})
export class BoardDetailsComponent implements OnInit, OnDestroy {
  selectedBoard!: Board;
  subscription: Subscription = new Subscription();

  constructor(
    private formService: FormService,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.subscription = this.boardService.selectedBoard.subscribe(
      board => (this.selectedBoard = board)
    );
  }

  onForm(type: FormType, columnId?: string, taskId?: string) {
    this.formService.onChangeFormVisibility(type);
    if (columnId) {
      this.boardService.onChangeSelectedColumn(columnId);
    }
    if (taskId) {
      this.boardService.onChangeSelectedTask(taskId);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
