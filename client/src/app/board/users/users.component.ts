import { Component, OnInit } from '@angular/core';
import { ApolloService } from '../apollo.service';
import { Observable, combineLatest } from 'rxjs';
import { map, catchError, tap, switchMap, take } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { SupabaseService } from 'src/app/supabase.service';
import { BoardService } from '../board.service';
import { User } from 'src/app/types';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  searchedFilteredUsers$: Observable<User[]> | null = null;
  submitted = false;
  tabName: 'add' | 'peek' = 'peek';
  projectUsers$: Observable<{ user: User }[]> | null = null;
  loggedInUserId$: Observable<string> | null = null;
  projectId$: Observable<string> | null = null;

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
    this.projectId$ = this.boardService.selectedProject.pipe(
      map(project => project?.userId ?? '')
    );

    this.loggedInUserId$ = this.supabase.session.pipe(
      map(data => data?.user.id ?? '')
    );

    this.projectUsers$ = this.boardService.selectedProject.pipe(
      map(project => project?.id ?? ''),
      switchMap(projectId => this.apollo.getUsersFromProject(projectId)),
      map(data => data.data.usersFromProject)
    );
  }

  changeTabToAdd() {
    this.tabName = 'add';
    this.form.reset();
  }

  changeTabToPeek() {
    this.tabName = 'peek';
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

    const userId$ = this.supabase.session.pipe(map(data => data?.user.id));

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

    this.submitted = false;
    this.form.reset();
  }

  onAddUser(userId: string) {
    this.boardService.selectedProject
      .pipe(
        map(project => project?.id ?? ''),
        switchMap(projectId => this.apollo.addUserToProject(projectId, userId)),
        catchError(async error => {
          this.toastService.showWarningToast('add', 'user');
          throw new Error(error);
        }),
        tap(() => this.toastService.showConfirmToast('add', 'user')),
        take(1)
      )
      .subscribe(() => {
        if (!this.searchedFilteredUsers$) {
          return;
        }
        this.searchedFilteredUsers$ = this.searchedFilteredUsers$.pipe(
          map(data => data.filter(user => user.id !== userId))
        );
      });
  }

  onRemoveUser(userId: string) {
    this.boardService.selectedProject
      .pipe(
        map(project => project?.id ?? ''),
        switchMap(projectId =>
          this.apollo.removeUserFromProject(projectId, userId)
        ),
        catchError(async error => {
          this.toastService.showWarningToast('delete', 'user');
          throw new Error(error);
        }),
        tap(() => this.toastService.showConfirmToast('delete', 'user')),
        take(1)
      )
      .subscribe();
  }
}
