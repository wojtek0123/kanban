import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Board } from '../board.component';
import {
  animate,
  state,
  transition,
  trigger,
  style,
} from '@angular/animations';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  animations: [
    trigger('smoothCollapse', [
      state(
        'initial',
        style({
          height: '0',
        })
      ),
      state(
        'final',
        style({
          height: '100%',
        })
      ),
      transition('initial<=>final', animate('250ms')),
    ]),
    trigger('rotateState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(180deg)' })),
      transition('default<=>rotated', animate('250ms')),
    ]),
  ],
})
export class AccordionComponent {
  @Input() projectName!: string;
  @Input() boards!: Board[];
  showContent = false;

  constructor(private boardService: BoardService) {}

  toggleShowContent() {
    this.showContent = !this.showContent;
  }

  onSelectBoard(boardId: string) {
    this.boardService.onChangeSelectedBoard(boardId);
  }
}
