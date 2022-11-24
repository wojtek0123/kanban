import { Component, Input } from '@angular/core';
import { Project } from '../board.component';
import { BoardService } from '../board.service';
import { NavigationService } from '../mobile-navigation/navigation.service';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent {
  @Input() projects!: Project[];

  showContent = true;
  selectedBoardId = '';
  selectedProjectId = '';

  constructor(
    private boardService: BoardService,
    public navigationService: NavigationService
  ) {}
}
