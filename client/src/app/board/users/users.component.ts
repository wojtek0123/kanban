import { Component, OnInit } from '@angular/core';
import { ApolloService } from '../apollo.service';
import { Observable, combineLatest } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { SupabaseService } from 'src/app/supabase.service';
import { BoardService } from '../board.service';
import { Board, User } from 'src/app/types';
import { ToastService } from '../toast/toast.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  searchedFilteredUsers$: Observable<User[]> | null = null;
  submitted = false;
  tabName: 'add' | 'peek' = 'add';
  projectUsers$: Observable<User[]> | null = null;

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
    this.fetchUsersFromProject();
  }

  fetchUsersFromProject() {
    this.projectUsers$ = this.boardService.selectedProject.pipe(
      switchMap(project =>
        this.apollo
          .getUsersFromProject(project?.users ?? [])
          .pipe(map(data => data.data.usersFromProject))
      )
    );
  }

  changeTabName() {
    if (this.tabName === 'add') {
      this.tabName = 'peek';
    } else {
      this.tabName = 'add';
    }

    this.form.reset();
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

    const userId = this.supabase.session.value?.user.id;

    const searchedUsers$ = this.apollo.getFilteredUsers(searchedEmail).pipe(
      catchError(async error => {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error('Something went wrong!');
        }
      }),
      map(data => data.data.filteredUsers.filter(user => user.id !== userId))
    );

    this.searchedFilteredUsers$ = combineLatest([
      searchedUsers$,
      this.projectUsers$ ?? [],
    ]).pipe(
      map(([searchedUsers, projectUsers]) =>
        searchedUsers.filter(searchedUser =>
          projectUsers.every(
            projectUser => searchedUser.userId !== projectUser.userId
          )
        )
      )
    );

    this.submitted = false;
    this.form.reset();
  }

  onAddUser(userId: string) {
    const projectId = this.boardService.selectedProjectId.value;

    if (projectId === '') {
      return;
    }

    this.apollo
      .addUserToProject(projectId, userId)
      .pipe(
        catchError(async () => {
          this.toastService.showToast('add', 'user');
          throw new Error('Something went wrong!');
        }),
        tap(() => this.toastService.showConfirmToast('add', 'user'))
      )
      .subscribe();

    if (!this.searchedFilteredUsers$) {
      return;
    }

    this.searchedFilteredUsers$ = this.searchedFilteredUsers$.pipe(
      map(data => data.filter(user => user.userId !== userId))
    );
  }
}
