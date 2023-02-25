import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SupabaseService } from 'src/app/services/supabase.service';
import { Observable, combineLatest } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { ApolloService } from 'src/app/services/apollo.service';
import { ToastService } from 'src/app/services/toast.service';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  changeName = false;
  loggedInUser$: Observable<User | undefined> | null = null;

  profile = this.fb.group({
    name: this.fb.control('', [Validators.maxLength(25), Validators.required]),
  });

  constructor(
    private fb: FormBuilder,
    private supabase: SupabaseService,
    private apollo: ApolloService,
    private toastService: ToastService,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    const userFromSession$ = this.supabase.getSessionObs.pipe(
      map(session => session?.user)
    );

    const usersFromProject$ = this.boardService.getUsersInTheProject;

    this.loggedInUser$ = combineLatest([
      userFromSession$,
      usersFromProject$,
    ]).pipe(
      map(([user, users]) =>
        users
          .flatMap(u => u.user)
          .filter(u => u.id === user?.id ?? '')
          .at(0)
      )
    );
  }

  get nameLength() {
    return this.profile.controls.name.value?.length ?? 0;
  }

  get formControls() {
    return this.profile.controls;
  }

  onShowNameForm() {
    this.changeName = !this.changeName;
    this.profile.reset();
  }

  onUpdateName() {
    if (this.profile.invalid) return;

    this.loggedInUser$
      ?.pipe(
        switchMap(user =>
          this.apollo.updateUserName(
            user?.id ?? '',
            this.profile.controls.name.value ?? ''
          )
        ),
        catchError(async error => {
          this.toastService.showToast('warning', `Couldn't update your name`);
          throw new Error(error);
        }),
        take(1)
      )
      .subscribe(() =>
        this.toastService.showToast('confirm', 'Successfully updated your name')
      );
  }
}
