import { Component, OnInit } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { ApolloService } from '../../services/apollo/apollo.service';
import { User } from '../../models/user.model';
import { SupabaseService } from '../../services/supabase/supabase.service';
import { Task } from '../../models/task.model';
import { Subtask } from 'src/app/models/subtask.model';

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
    this.loggedInUser$ = this.supabase.session$.pipe(map(data => data?.user));

    this.userTasks$ = this.loggedInUser$.pipe(
      switchMap(user => this.apollo.getTasksFromUser(user?.id ?? ''))
    );
  }

  subtaskTrackBy(_index: number, subtask: Subtask) {
    return subtask.id;
  }
}
