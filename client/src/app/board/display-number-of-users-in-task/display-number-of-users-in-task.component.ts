import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormType } from 'src/app/models/types';
import { ApolloService } from 'src/app/services/apollo.service';
import { BoardService } from 'src/app/services/board.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-display-number-of-users-in-task',
  templateUrl: './display-number-of-users-in-task.component.html',
  styleUrls: ['./display-number-of-users-in-task.component.css'],
})
export class DisplayNumberOfUsersInTaskComponent implements OnInit {
  @Input() taskId!: string;
  users$: Observable<number> | undefined = undefined;

  constructor(
    private apollo: ApolloService,
    private formService: FormService,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.users$ = this.apollo
      .getUsersAndTasks()
      .pipe(
        map(
          data =>
            data.data.getUsersAndTasks.filter(
              data => data.taskId === this.taskId
            ).length
        )
      );
  }

  onForm(type: FormType) {
    this.formService.onChangeFormVisibility(type);
    this.boardService.onChangeSelectedTaskId(this.taskId);
  }
}
