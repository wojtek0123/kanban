import { Component, DoCheck, Input } from '@angular/core';
import { Board, Project } from '../board.component';
import { BoardService } from '../board.service';
import { NavigationService } from '../mobile-navigation/navigation.service';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent implements DoCheck {
  @Input() projectName!: string;
  @Input() projects!: Project[];

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
}
