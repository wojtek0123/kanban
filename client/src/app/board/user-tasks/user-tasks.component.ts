import { Component, OnInit } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { ApolloService } from 'src/app/services/apollo.service';
import { User } from 'src/app/models/user.model';
import { SupabaseService } from 'src/app/services/supabase.service';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css'],
})
export class UserTasksComponent implements OnInit {
  userTasks$: Observable<{ task: Task }[]> | null = null;
  loggedInUser$: Observable<Partial<User> | undefined> | null = null;

  constructor(
    private apollo: ApolloService,
    private supabase: SupabaseService
  ) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.supabase.getSessionObs.pipe(
      map(data => data?.user)
    );

    this.userTasks$ = this.loggedInUser$.pipe(
      switchMap(user => this.apollo.getTasksFromUser(user?.id ?? '')),
      map(data => data.data.getTasksFromUser)
    );
  }
}
