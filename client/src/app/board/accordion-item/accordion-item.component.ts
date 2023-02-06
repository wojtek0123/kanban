import { Component, Input, OnInit } from '@angular/core';
import { Project, Board, FormType } from '../../types';
import { BoardService } from '../board.service';
import { FormService } from '../form/form.service';
import { NavigationService } from '../mobile-navigation/navigation.service';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.css'],
})
export class AccordionItemComponent implements OnInit {
  @Input() project!: Project;
  @Input() selectedBoardId!: string | null;
  showContent = false;

  constructor(
    private boardService: BoardService,
    private navigationService: NavigationService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    if (
      this.project.boards.filter(board => board.id === this.selectedBoardId)
        .length !== 0
    )
      this.showContent = true;
  }

  onForm(type: FormType, project: Project) {
    this.boardService.onChangeSelectedProject(project);
    this.formService.onChangeFormVisibility(type);
  }

  toggleShowContent(state: boolean) {
    this.showContent = state;
  }

  onSelectBoard(board: Board) {
    this.boardService.onChangeSelectedProject(this.project);
    this.boardService.onChangeSelectedBoard(board);
    this.navigationService.onMenu();
  }
}
