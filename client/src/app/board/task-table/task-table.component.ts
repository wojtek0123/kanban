import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Board } from 'src/app/models/board.model';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from 'src/app/models/task.model';

export interface TaskTable {
  [key: string]: string;
}

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskTableComponent implements OnInit, OnDestroy {
  @Input() selectedBoard: Observable<Board | undefined> | null = null;
  displayColumns$: Observable<string[]> | undefined = undefined;
  displayedTableColumns = [
    'title',
    'description',
    'column name',
    'tag names',
    'createdAt',
    'updatedAt',
  ];
  dataSource!: CdkTableDataSourceInput<Task & { columnName: string }>;
  tableTask$:
    | Observable<(Task & { columnName: string })[] | undefined>
    | undefined = undefined;
  destroy$ = new Subject<void>();

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

    if (this.tableTask$) {
      this.tableTask$.pipe(takeUntil(this.destroy$)).subscribe(data => {
        if (data) {
          this.dataSource = new MatTableDataSource<
            Task & { columnName: string }
          >(data);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
