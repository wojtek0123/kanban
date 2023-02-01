import { Component, OnInit } from '@angular/core';
import { ApolloService } from '../apollo.service';
import { Observable, combineLatest } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { SupabaseService } from 'src/app/supabase.service';
import { BoardService } from '../board.service';
import { User } from 'src/app/types';
import { ToastService } from '../toast/toast.service';
import { ApolloQueryResult } from '@apollo/client/core/types';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: Observable<User[]> | null = null;
  submitted = false;
  tabName: 'add' | 'peek' = 'add';
  // projectUsers$: Observable<string[] | undefined> | null = null;
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

    this.users = this.apollo.getFilteredUsers(searchedEmail).pipe(
      catchError(async error => {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error('Something went wrong!');
        }
      }),
      map(data => data.data.filteredUsers.filter(user => user.id !== userId))
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
  }
}
