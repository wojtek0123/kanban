import { Component, DoCheck, Input } from '@angular/core';
import { Board, Project } from '../board.component';
import {
  animate,
  state,
  transition,
  trigger,
  style,
} from '@angular/animations';
import { BoardService } from '../board.service';
import { NavigationService } from '../mobile-navigation/navigation.service';

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
export class AccordionComponent implements DoCheck {
  @Input() projectName!: string;
  @Input() projects!: Project[];
  // @Input() boards!: Board[];
  showContent = true;
  selectedBoardId = '';
  selectedProjectId = '';

  constructor(
    private boardService: BoardService,
    public navigationService: NavigationService
  ) {}

  ngDoCheck(): void {
    this.selectedProjectId = this.boardService.selectedProjectId.getValue();
    this.selectedBoardId = this.boardService.selectedBoardId.getValue();
  }

  toggleShowContent() {
    this.showContent = !this.showContent;
  }

  onSelectBoard(boardId: string) {
    this.boardService.onChangeSelectedBoard(boardId);
    this.navigationService.onMenu();
  }
}
