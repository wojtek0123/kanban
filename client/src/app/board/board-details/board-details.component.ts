import { Component, Input, OnInit, OnDestroy } from '@angular/core';
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
  selectedBoard!: Board | undefined;
  subscription = new Subscription();
  // @Input() selectedBoard?: Board;

  constructor(
    private formService: FormService,
    private boardService: BoardService
  ) {}

  ngOnInit() {
    this.subscription = this.boardService.selectedBoard.subscribe(
      board => (this.selectedBoard = board)
    );
  }

  onForm(type: FormType, columnId?: string, taskId?: string) {
    this.formService.onChangeFormVisibility(type);
    if (columnId) {
      this.boardService.onChangeSelectedColumnId(columnId);
    }
    if (taskId) {
      this.boardService.onChangeSelectedTaskId(taskId);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
