import { Component, DoCheck, Input } from '@angular/core';
import { Project } from '../../board.component';
import { BoardService } from '../../board.service';
import { NavigationService } from '../../mobile-navigation/navigation.service';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.css'],
})
export class AccordionItemComponent implements DoCheck {
  @Input() project!: Project;
  showContent = false;
  selectedBoardId = '';

  constructor(
    private boardService: BoardService,
    private navigationService: NavigationService
  ) {}

  ngDoCheck(): void {
    this.selectedBoardId = this.boardService.selectedBoardId.getValue();
  }

  toggleShowContent(state: boolean) {
    this.showContent = state;
  }

  onSelectBoard(boardId: string) {
    this.boardService.onChangeSelectedBoard(boardId);
    this.navigationService.onMenu();
  }
}
