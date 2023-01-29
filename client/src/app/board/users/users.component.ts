import { Component } from '@angular/core';
import { ApolloService } from '../apollo.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';

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
  show!: Observable<boolean>;
  isSubmitted = false;

  form = this.fb.group({
    email: this.fb.control('', [Validators.required]),
  });

  constructor(private apollo: ApolloService, private fb: FormBuilder) {}

  onSubmit() {
    this.isSubmitted = true;

    const searchedEmail = this.form.controls.email.value;

    if (!searchedEmail) {
      return;
    }

    if (this.form.invalid) {
      return;
    }

    this.users = this.apollo.getFilteredUsers(searchedEmail).pipe(
      catchError(async error => {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error('Something went wrong!');
        }
      }),
      map(data => data.data.filteredUsers)
    );

    this.isSubmitted = false;
    this.form.reset();
  }
}
