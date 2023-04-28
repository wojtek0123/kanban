import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApolloService } from '../../services/apollo/apollo.service';
import { Observable, combineLatest } from 'rxjs';
import { map, catchError, switchMap, take, tap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
import { User } from 'src/app/models/user.model';
import { ToastService } from '../../services/toast/toast.service';
import { Task } from 'src/app/models/task.model';
import { ActivatedRoute } from '@angular/router';

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
  projectUsers$: Observable<{ user: User }[]> | null = null;
  tabName: Tabs = 'peek';
  projectId$: Observable<string> | null = null;
  tasksFromUser!: { task: Task }[];
  isOwner$ = new Observable<boolean>();
  userId$ = new Observable<string>();

  form = this.fb.group({
    email: this.fb.control('', [Validators.required]),
  });

  constructor(
    private apollo: ApolloService,
    private fb: FormBuilder,
    private supabase: SupabaseService,
    private toastService: ToastService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.projectId$ = this.route.params.pipe(map(param => param['projectId']));

    this.userId$ = this.supabase.session$.pipe(
      map(session => session?.user.id ?? '')
    );

    this.isOwner$ = this.apollo.isLoggedInUserAOwnerOfTheProject$;

    this.projectUsers$ = this.projectId$.pipe(
      switchMap(projectId => this.apollo.getUsersFromProject(projectId))
    );
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

    const searchedUsers$ = this.apollo.getFilteredUsers(searchedEmail).pipe(
      catchError(async error => {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error('Something went wrong!');
        }
      })
    );

    const searchedUserWithoutOwner$ = combineLatest([
      searchedUsers$,
      this.userId$,
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
    this.projectId$
      ?.pipe(
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
    this.projectId$
      ?.pipe(
        switchMap(projectId =>
          this.apollo.removeUserFromProject(projectId, userId)
        ),
        catchError(async error => {
          this.toastService.showToast('warning', `Couldn't remove a new user`);
          throw new Error(error);
        })
      )
      .subscribe(() => {
        this.toastService.showToast(
          'confirm',
          'Successfully remove a new user'
        );
      });
  }

  filteredUser(_index: number, user: User) {
    return user.id;
  }

  projectUserTrackBy(_index: number, data: { user: User }) {
    return data.user.id;
  }
}
