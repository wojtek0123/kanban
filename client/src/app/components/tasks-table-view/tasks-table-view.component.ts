import { ChangeDetectionStrategy, Component, DoCheck, Input } from '@angular/core';
import { Board } from 'src/app/models/board.model';
import { Task } from 'src/app/models/task.model';
import { SortBy } from 'src/app/models/types';
import { FilterByTitlePipe } from '../../pipes/filter-by-title/filter-by-title.pipe';
import { FilterByTagsPipe } from '../../pipes/filter-by-tags/filter-by-tags.pipe';
import { SortTasksPipe } from '../../pipes/sort-tasks/sort-tasks.pipe';
import { NgFor, DatePipe } from '@angular/common';
import { Tag } from 'src/app/models/tag.interface';

export interface TaskTable {
  [key: string]: string;
}

@Component({
  selector: 'app-task-table',
  templateUrl: './tasks-table-view.component.html',
  styleUrls: ['./tasks-table-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgFor, DatePipe, SortTasksPipe, FilterByTagsPipe, FilterByTitlePipe],
})
export class TaskTableComponent implements DoCheck {
  @Input() board: Board | undefined | null = null;
  @Input() searchTerm = '';
  @Input() tags: Tag[] = [];
  @Input() sortBy!: SortBy;
  displayColumns: string[] = [];
  tableTask: Task[] = [];
  displayedTableColumns = ['title', 'description', 'column name', 'tag names', 'createdAt', 'updatedAt'];

  ngDoCheck() {
    this.tableTask =
      this.board?.columns.flatMap(column =>
        column.tasks.flatMap(task => Object.assign({}, { ...task, ['columnName']: column.name }))
      ) ?? [];

    this.displayColumns = this.board?.columns.flatMap(column => column.name) ?? [];
  }

  taskTrackBy(_index: number, task: Task) {
    return task.id;
  }

  tableColumnTrackBy(index: number) {
    return index;
  }
}
