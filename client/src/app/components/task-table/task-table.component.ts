import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  Input,
} from '@angular/core';
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
export class TaskTableComponent implements DoCheck {
  @Input() board: Board | undefined | null = null;
  @Input() searchTerm = '';
  @Input() tags: string[] = [];
  @Input() sortBy!: SortBy;
  displayColumns: string[] = [];
  tableTask: Task[] = [];
  displayedTableColumns = [
    'title',
    'description',
    'column name',
    'tag names',
    'createdAt',
    'updatedAt',
  ];

  constructor() {}

  ngDoCheck() {
    this.tableTask =
      this.board?.columns.flatMap(columnWrapper =>
        columnWrapper.column.tasks.flatMap(task =>
          Object.assign(
            {},
            { ...task, ['columnName']: columnWrapper.column.name }
          )
        )
      ) ?? [];

    this.displayColumns =
      this.board?.columns.flatMap(columnWrapper => columnWrapper.column.name) ??
      [];
  }
}
