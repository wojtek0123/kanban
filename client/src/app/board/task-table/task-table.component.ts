import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Board } from 'src/app/models/board.model';
import { Task } from 'src/app/models/task.model';
import { SortBy } from 'src/app/models/types';

export interface TaskTable {
  [key: string]: string;
}

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskTableComponent implements OnInit {
  @Input() selectedBoard: Observable<Board | undefined> | null = null;
  @Input() searchTerm = '';
  @Input() tags: string[] = [];
  @Input() sortBy!: SortBy;
  displayColumns$: Observable<string[]> | undefined = undefined;
  displayedTableColumns = [
    'title',
    'description',
    'column name',
    'tag names',
    'createdAt',
    'updatedAt',
  ];
  tableTask$: Observable<Task[] | undefined> | undefined = undefined;

  constructor() {}

  ngOnInit(): void {
    this.tableTask$ = this.selectedBoard?.pipe(
      map(board =>
        board?.columns.flatMap(column =>
          column.column.tasks.flatMap(task =>
            Object.assign({}, { ...task, ['columnName']: column.column.name })
          )
        )
      )
    );

    this.displayColumns$ = this.selectedBoard?.pipe(
      map(board => board?.columns.flatMap(column => column.column.name) ?? [])
    );
  }
}
