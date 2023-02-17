import { Component, OnInit } from '@angular/core';
import { combineLatest, firstValueFrom, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ApolloService } from 'src/app/services/apollo.service';
import { BoardService } from 'src/app/services/board.service';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { SupabaseService } from 'src/app/services/supabase.service';

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
    private supabase: SupabaseService
  ) {}

  ngOnInit(): void {
    this.taskId$ = this.boardService.getSelectedTaskId;

    this.loggedInUserId$ = this.supabase.getSessionObs.pipe(
      map(data => data?.user.id ?? '')
    );

    this.projectId$ = this.boardService.getSelectedProject.pipe(
      map(project => project?.userId ?? '')
    );

    this.projectUsers$ = this.boardService.getSelectedProject.pipe(
      map(project => project?.id ?? ''),
      switchMap(projectId => this.apollo.getUsersFromProject(projectId)),
      map(data => data.data.usersFromProject)
    );

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
        take(1)
      )
      .subscribe();
  }

  onRemoveUserFromTask(userId: string) {
    this.taskId$
      .pipe(
        switchMap(taskId => this.apollo.removeUserFromTask(taskId, userId)),
        take(1)
      )
      .subscribe();
  }
}
