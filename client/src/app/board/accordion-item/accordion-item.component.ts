import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Project } from '../../models/project.model';
import { Board } from '../../models/board.model';
import { BoardService } from '../../services/board.service';
import { FormService } from '../../services/form.service';
import { NavigationService } from '../../services/navigation.service';
import { SupabaseService } from 'src/app/services/supabase.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItemComponent implements OnInit {
  @Input() project!: Project;
  showContent = true;
  loggedInUserId$: Observable<string | undefined> | null = null;
  selectedBoardId$: Observable<string | undefined> | null = null;

  constructor(
    private boardService: BoardService,
    private navigationService: NavigationService,
    private formService: FormService,
    private supabase: SupabaseService
  ) {}

  ngOnInit(): void {
    this.selectedBoardId$ = this.boardService.getSelectedBoard.pipe(
      map(board => board?.id),
      tap(boardId =>
        this.project.boards.filter(board =>
          board.id === boardId ? (this.showContent = true) : null
        )
      )
    );

    this.loggedInUserId$ = this.supabase.getSessionObs.pipe(
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
