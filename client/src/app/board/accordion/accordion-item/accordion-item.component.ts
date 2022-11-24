import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from '../../board.component';
import { BoardService } from '../../board.service';
import { FormService, FormType } from '../../form/form.service';
import { NavigationService } from '../../mobile-navigation/navigation.service';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.css'],
})
export class AccordionItemComponent implements OnInit, OnDestroy {
  @Input() project!: Project;
  showContent = true;
  selectedBoardId = '';
  subscription = new Subscription();

  constructor(
    private boardService: BoardService,
    private navigationService: NavigationService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.subscription = this.boardService.selectedBoardId.subscribe(
      id => (this.selectedBoardId = id)
    );
  }

  onForm(type: FormType, projectId: string) {
    this.boardService.onChangeSelectedProjectId(projectId);
    this.formService.onChangeFormVisibility(type);
  }

  toggleShowContent(state: boolean) {
    this.showContent = state;
  }

  onSelectBoard(boardId: string) {
    this.boardService.onChangeSelectedBoardId(boardId);
    this.navigationService.onMenu();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
