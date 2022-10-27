import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoardsService } from './boards.service';
import { FormAddTaskService, FormType } from './form/form.service';
import { Board } from './boards.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  boards: Board[] = [];
  selectedBoard!: Board;
  selectedBoardSub: Subscription = new Subscription();

  constructor(
    public formAddTaskService: FormAddTaskService,
    private boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.boards = this.boardsService.boards;
    this.selectedBoardSub = this.boardsService.selectedBoard.subscribe(
      board => (this.selectedBoard = board)
    );
  }

  ngOnDestroy(): void {
    this.selectedBoardSub.unsubscribe();
  }

  onOpenForm(formType: FormType) {
    this.formAddTaskService.onChangeFormVisibility(formType);
  }

  onSelectBoard(event: Event) {
    const value = (event.target as HTMLButtonElement).textContent
      ?.toLowerCase()
      .trim();
    if (!value) {
      return;
    }
    this.boardsService.onChangeSelectedBoard(value);
    this.selectedBoardSub = this.boardsService.selectedBoard.subscribe(
      board => (this.selectedBoard = board)
    );
  }
}
