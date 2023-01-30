import { Component } from '@angular/core';
import { ApolloService } from '../apollo.service';
import { Observable, combineLatest } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { SupabaseService } from 'src/app/supabase.service';

export interface User {
  id: string;
  name: string;
  email: string;
  userId: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: Observable<User[]> | null = null;
  // userId$: Observable<string> | null = null;
  show!: Observable<boolean>;
  isSubmitted = false;

  form = this.fb.group({
    email: this.fb.control('', [Validators.required]),
  });

  constructor(
    private apollo: ApolloService,
    private fb: FormBuilder,
    private supabase: SupabaseService
  ) {}

  onSubmit() {
    this.isSubmitted = true;

    const searchedEmail = this.form.controls.email.value;

    if (!searchedEmail) {
      return;
    }

    if (this.form.invalid) {
      return;
    }

    const userId$ = this.supabase.session.pipe(
      map(data => data?.user.id ?? '')
    );

    const filteredUsers$ = this.apollo.getFilteredUsers(searchedEmail).pipe(
      catchError(async error => {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error('Something went wrong!');
        }
      }),
      map(data => data.data.filteredUsers)
    );

    this.users = combineLatest([userId$, filteredUsers$]).pipe(
      map(([userId, users]) => users.filter(user => user.id !== userId))
    );

    this.isSubmitted = false;
    this.form.reset();
  }
}
