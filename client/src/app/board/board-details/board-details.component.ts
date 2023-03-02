import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormType } from '../../models/types';
import { Board } from '../../models/board.model';
import { User } from '../../models/user.model';
import { BoardService } from '../../services/board.service';
import { FormService } from '../../services/form.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { SupabaseService } from 'src/app/services/supabase.service';
import { Router } from '@angular/router';

type BoardTypes = 'kanban' | 'table';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardDetailsComponent implements OnInit, OnDestroy {
  loggedInUser$: Observable<Partial<User> | undefined> | null = null;
  projectOwnerId$: Observable<string> | null = null;
  searchTerm = '';
  checkedTags: string[] = [];
  show = false;
  boardId = '';
  tags!: Observable<string[]>;
  destroy$ = new Subject<void>();
  selectedBoard$: Observable<Board | undefined> | null = null;
  usersInTheProject$: Observable<{ user: User }[]> | null = null;
  boardType: BoardTypes = 'kanban';

  constructor(
    private formService: FormService,
    private boardService: BoardService,
    private supabase: SupabaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.selectedBoard$ = this.boardService.getSelectedBoard;

    this.loggedInUser$ = this.supabase.getSessionObs.pipe(
      map(data => data?.user)
    );

    this.projectOwnerId$ = this.boardService.getSelectedProject.pipe(
      map(project => project?.userId ?? '')
    );

    this.usersInTheProject$ = this.boardService.getUsersInTheProject;

    this.tags = this.boardService.getTags;

    this.boardService.getTags.pipe(takeUntil(this.destroy$)).subscribe(data => {
      if (!data) {
        return;
      }

      this.checkedTags = [''];
      this.checkedTags = [...this.checkedTags, ...data];
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onForm(type: FormType, columnId?: string, taskId?: string) {
    this.formService.onChangeFormVisibility(type);
    if (columnId) {
      this.boardService.onChangeSelectedColumnId(columnId);
    }
    if (taskId) {
      this.boardService.onChangeSelectedTaskId(taskId);
    }
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
  }
}
