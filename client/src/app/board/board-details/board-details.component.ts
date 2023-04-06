import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormType, SortBy } from '../../models/types';
import { Board } from '../../models/board.model';
import { User } from '../../models/user.model';
import { BoardService } from '../../services/board.service';
import { FormService } from '../../services/form.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SupabaseService } from 'src/app/services/supabase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApolloService } from 'src/app/services/apollo.service';

type BoardTypes = 'kanban' | 'table';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardDetailsComponent implements OnInit {
  loggedInUser$: Observable<Partial<User> | undefined> | null = null;
  projectOwnerId$: Observable<string> | null = null;
  searchTerm = '';
  checkedTags: string[] = [];
  selectedBoard$: Observable<Board> | null = null;
  usersInTheProject$: Observable<{ user: User }[]> | null = null;
  boardType: BoardTypes = 'kanban';
  sortBy: SortBy = {
    column: 'title',
    direction: 'asc',
  };

  constructor(
    private formService: FormService,
    private boardService: BoardService,
    private supabase: SupabaseService,
    private router: Router,
    private route: ActivatedRoute,
    private apollo: ApolloService
  ) {}

  ngOnInit() {
    const params$ = this.route.params;

    this.selectedBoard$ = params$.pipe(
      map(data => data['boardId']),
      switchMap(boardId => this.apollo.getBoard(boardId)),
      map(data => data.data.board)
    );

    this.loggedInUser$ = this.supabase.getSessionObs.pipe(
      map(data => data?.user)
    );

    this.projectOwnerId$ = this.boardService.getSelectedProject.pipe(
      map(project => project?.userId ?? '')
    );

    this.usersInTheProject$ = this.boardService.getUsersInTheProject;
  }

  onForm(type: FormType, selectColumn?: boolean) {
    this.formService.onChangeFormVisibility(type, selectColumn);
  }

  async onLogout() {
    try {
      const { error } = await this.supabase.signOut();
      if (error) {
        console.error(error.message);
      }
      this.router.navigate(['/home']);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  onSelectedTags(checkedTags: string[]) {
    this.checkedTags = checkedTags;
    console.log(this.checkedTags);
  }
}
