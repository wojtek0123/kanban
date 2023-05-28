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
  templateUrl: './tasks-table-view.component.html',
  styleUrls: ['./tasks-table-view.component.css'],
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

  ngDoCheck() {
    this.tableTask =
      this.board?.columns.flatMap(column =>
        column.tasks.flatMap(task =>
          Object.assign({}, { ...task, ['columnName']: column.name })
        )
      ) ?? [];

    this.displayColumns =
      this.board?.columns.flatMap(column => column.name) ?? [];
  }

  taskTrackBy(_index: number, task: Task) {
    return task.id;
  }

  tagNameTrackBy(index: number, _tagName: string) {
    return index;
  }

  tableColumnTrackBy(index: number, column: string) {
    return index;
  }
}
