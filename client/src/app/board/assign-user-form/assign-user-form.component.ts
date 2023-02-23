import { Component, OnInit } from '@angular/core';
import { combineLatest, firstValueFrom, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ApolloService } from 'src/app/services/apollo.service';
import { BoardService } from 'src/app/services/board.service';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { SupabaseService } from 'src/app/services/supabase.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-assign-user-form',
  templateUrl: './assign-user-form.component.html',
  styleUrls: ['./assign-user-form.component.css'],
})
export class AssignUserFormComponent implements OnInit {
  taskId$ = new Observable<string>();
  projectUsers$: Observable<{ user: User }[]> | null = null;
  userFromTask$: Observable<{ user: User }[]> | null = null;
  tabName: 'peek' | 'assign' = 'peek';
  loggedInUserId$: Observable<string> | null = null;
  projectId$: Observable<string> | null = null;
  isUserAssign$: Observable<string[]> = new Observable<string[]>();

  constructor(
    private boardService: BoardService,
    private apollo: ApolloService,
    private supabase: SupabaseService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.taskId$ = this.boardService.getSelectedTaskId;

    this.loggedInUserId$ = this.supabase.getSessionObs.pipe(
      map(data => data?.user.id ?? '')
    );

    this.projectId$ = this.boardService.getSelectedProject.pipe(
      map(project => project?.userId ?? '')
    );

    this.projectUsers$ = this.boardService.getUsersInTheProject;

    this.userFromTask$ = this.taskId$.pipe(
      switchMap(taskId => this.apollo.getUsersFromTask(taskId)),
      map(data => data.data.usersFromTask)
    );

    this.isUserAssign$ = combineLatest([
      this.projectUsers$,
      this.userFromTask$,
    ]).pipe(
      map(([projectUsers, taskUsers]) =>
        projectUsers.filter(projectUser =>
          taskUsers.some(taskUser => taskUser.user.id === projectUser.user.id)
        )
      ),
      map(users => users.map(user => user.user.id))
    );
  }

  async checkIsUserAssign(userId: string) {
    if (!this.userFromTask$) return false;

    const value$ = this.userFromTask$.pipe(
      map(users => users.filter(data => data.user.id === userId)),
      map(users => users.length === 0),
      take(1)
    );
    value$.subscribe(data => console.log(data));
    return await firstValueFrom(value$);
  }

  changeTab(tabName: 'peek' | 'assign') {
    this.tabName = tabName;
  }

  onAddUserToTask(userId: string) {
    this.taskId$
      .pipe(
        switchMap(taskId => this.apollo.addUserToTask(taskId, userId)),
        catchError(async error => {
          this.toastService.showToast(
            'warning',
            'Coudn&apos;t assign this user'
          );
          throw new Error(error);
        }),
        take(1)
      )
      .subscribe(() =>
        this.toastService.showToast(
          'confirm',
          'Successfully assigned this user'
        )
      );
  }

  onRemoveUserFromTask(userId: string) {
    this.taskId$
      .pipe(
        switchMap(taskId => this.apollo.removeUserFromTask(taskId, userId)),
        catchError(async error => {
          this.toastService.showToast(
            'warning',
            'Coudn&apos;t remove this user from this task'
          );
          throw new Error(error);
        }),
        take(1)
      )
      .subscribe(() =>
        this.toastService.showToast(
          'confirm',
          'Successfully remove this user from this task'
        )
      );
  }
}
