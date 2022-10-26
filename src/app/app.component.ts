import { Component, OnInit } from '@angular/core';
import { BoardsService } from './boards.service';
import { FormAddTaskService } from './form-add-task/form-add-task.service';
import { Board } from './boards.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  boards: Board[] = [];
  selectedBoard!: Board | undefined;

  constructor(
    public formAddTaskService: FormAddTaskService,
    private boardsService: BoardsService
  ) {}

  ngOnInit(): void {
    this.boards = this.boardsService.boards;
    this.selectedBoard = this.boards[0];
  }

  onOpenAddTaskForm() {
    this.formAddTaskService.onChangeFormVisibility();
  }

  onSelectBoard(event: Event) {
    const value = (event.target as HTMLButtonElement).textContent
      ?.toLowerCase()
      .trim();
    console.log(value);
    this.selectedBoard = this.boardsService.boards.find(
      (board) => board.name.toLowerCase() === value
    );
  }
}
