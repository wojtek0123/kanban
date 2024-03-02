import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApolloService } from '../../services/apollo/apollo.service';
import { User } from '../../models/user.model';
import { SupabaseService } from '../../services/supabase/supabase.service';
import { Task } from '../../models/task.model';
import { Subtask } from 'src/app/models/subtask.model';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css'],
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe],
})
export class UserTasksComponent {
  userTasks$: Observable<{ task: Task }[]> | null = null;
  userTasksError$ = new Observable<string | null>();
  loggedInUser$: Observable<Partial<User> | undefined> | null = null;

  constructor(private apollo: ApolloService, private supabase: SupabaseService) {}

  subtaskTrackBy(_index: number, subtask: Subtask) {
    return subtask.id;
  }
}
