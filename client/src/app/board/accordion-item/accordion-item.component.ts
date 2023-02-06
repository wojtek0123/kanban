import { Component, Input, OnInit } from '@angular/core';
import { Project, Board } from '../../types';
import { BoardService } from '../board.service';
import { FormService } from '../form/form.service';
import { NavigationService } from '../mobile-navigation/navigation.service';
import { SupabaseService } from 'src/app/supabase.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.css'],
})
export class AccordionItemComponent implements OnInit {
  @Input() project!: Project;
  @Input() selectedBoardId!: string | null;
  showContent = false;
  loggedInUserId$: Observable<string | undefined> | null = null;

  constructor(
    private boardService: BoardService,
    private navigationService: NavigationService,
    private formService: FormService,
    private supabase: SupabaseService
  ) {}

  ngOnInit(): void {
    if (
      this.project.boards.filter(board => board.id === this.selectedBoardId)
        .length !== 0
    ) {
      this.showContent = true;
    }

    this.loggedInUserId$ = this.supabase.session.pipe(
      map(session => session?.user.id ?? '')
    );
  }

  onForm() {
    this.boardService.onChangeSelectedProject(this.project);
    this.boardService.onChangeSelectedBoard(this.project.boards.at(0));
    this.formService.onChangeFormVisibility('board');
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
