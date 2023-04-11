import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SupabaseService } from 'src/app/services/supabase.service';
import { Observable } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { ApolloService } from 'src/app/services/apollo.service';
import { ToastService } from 'src/app/services/toast.service';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.supabase.getSessionObs.pipe(
      map(session => session?.user)
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
      .subscribe(() => {
        this.toastService.showToast(
          'confirm',
          'Successfully updated your name'
        );
        this.onShowNameForm();
      });
  }
}
