import { Component } from '@angular/core';
import { ApolloService } from '../apollo.service';
import { Observable, combineLatest, of } from 'rxjs';
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
  submitted = false;
  tabName: 'add' | 'peek' = 'add';

  form = this.fb.group({
    email: this.fb.control('', [Validators.required]),
  });

  constructor(
    private apollo: ApolloService,
    private fb: FormBuilder,
    private supabase: SupabaseService
  ) {}

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
}
