import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApolloService } from '../../services/apollo.service';
import { Observable, combineLatest } from 'rxjs';
import { map, catchError, switchMap, take } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { SupabaseService } from 'src/app/services/supabase.service';
import { BoardService } from '../../services/board.service';
import { User } from 'src/app/models/user.model';
import { ToastService } from '../../services/toast.service';
import { Task } from 'src/app/models/task.model';

type Tabs = 'add' | 'peek';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  searchedFilteredUsers$: Observable<User[]> | null = null;
  submitted = false;
  tabName: Tabs = 'peek';
  projectUsers$: Observable<{ user: User }[]> | null = null;
  loggedInUserId$: Observable<string> | null = null;
  projectId$: Observable<string> | null = null;
  tasksFromUser!: { task: Task }[];

  form = this.fb.group({
    email: this.fb.control('', [Validators.required]),
  });

  constructor(
    private apollo: ApolloService,
    private fb: FormBuilder,
    private supabase: SupabaseService,
    private boardService: BoardService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.projectId$ = this.boardService.getSelectedProject.pipe(
      map(project => project?.userId ?? '')
    );

    this.loggedInUserId$ = this.supabase.getSessionObs.pipe(
      map(data => data?.user.id ?? '')
    );

    this.projectUsers$ = this.boardService.getUsersInTheProject;
  }

  changeTab(tabName: Tabs) {
    this.tabName = tabName;

    if (tabName === 'add') {
      this.form.reset();
      this.submitted = false;
      this.searchedFilteredUsers$ = null;
    }
  }

  onSubmit() {
    this.submitted = true;

    const searchedEmail = this.form.controls.email.value;

    if (!searchedEmail) {
      return;
    }

    if (this.form.invalid) {
      return;
    }

    const userId$ = this.supabase.getSessionObs.pipe(
      map(data => data?.user.id)
    );

    const searchedUsers$ = this.apollo.getFilteredUsers(searchedEmail).pipe(
      catchError(async error => {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error('Something went wrong!');
        }
      }),
      map(data => data.data.filteredUsers)
    );

    const searchedUserWithoutOwner$ = combineLatest([
      searchedUsers$,
      userId$,
    ]).pipe(
      map(([searchedUsers, id]) => searchedUsers.filter(user => user.id !== id))
    );

    this.searchedFilteredUsers$ = combineLatest([
      searchedUserWithoutOwner$,
      this.projectUsers$ ?? [],
    ]).pipe(
      map(([searchedUsers, projectUsers]) =>
        searchedUsers.filter(searchedUser =>
          projectUsers.every(
            projectUser => searchedUser.id !== projectUser.user.id
          )
        )
      )
    );
  }

  onAddUser(userId: string) {
    this.boardService.getSelectedProject
      .pipe(
        map(project => project?.id ?? ''),
        switchMap(projectId => this.apollo.addUserToProject(projectId, userId)),
        catchError(async error => {
          this.toastService.showToast('warning', `Couldn't add a new user`);
          throw new Error(error);
        }),
        take(1)
      )
      .subscribe(() => {
        if (!this.searchedFilteredUsers$) {
          return;
        }
        this.toastService.showToast('confirm', 'Successfully added a new user');
        this.searchedFilteredUsers$ = this.searchedFilteredUsers$.pipe(
          map(data => data.filter(user => user.id !== userId))
        );
      });
  }

  onRemoveUser(userId: string) {
    this.apollo
      .getTasksFromUser(userId)
      .pipe(
        map(data => data.data.getTasksFromUser),
        take(1)
      )
      .subscribe(data => {
        console.log(data);
        this.tasksFromUser = data;

        for (let index = 0; index < data.length; index++) {
          const taskId = data.at(index)?.task.id ?? '';

          this.apollo
            .removeUserFromTask(taskId, userId)
            .pipe(take(1))
            .subscribe();
        }
      });

    this.boardService.getSelectedProject
      .pipe(
        map(project => project?.id ?? ''),
        switchMap(projectId =>
          this.apollo.removeUserFromProject(projectId, userId)
        ),
        catchError(async error => {
          this.toastService.showToast('warning', `Couldn't delete this user`);
          throw new Error(error);
        }),
        take(1)
      )
      .subscribe(() =>
        this.toastService.showToast('confirm', 'Successfully deleted this user')
      );
  }
}
