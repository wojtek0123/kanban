import { Component, Input } from '@angular/core';
import { Board } from '../board.component';
import { BoardService } from '../board.service';
import { FormService, FormType } from '../form/form.service';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css'],
})
export class BoardDetailsComponent {
  @Input() selectedBoard?: Board;

  constructor(
    private formService: FormService,
    private boardService: BoardService
  ) {}

  onForm(type: FormType, columnId?: string) {
    this.formService.onChangeFormVisibility(type);
    if (columnId) {
      this.boardService.onChangeSelectedColumn(columnId);
    }
  }
}
