import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../../models/board.model';
import { Task } from '../../models/task.model';
import { catchError, take } from 'rxjs/operators';
import { ApolloService } from '../../services/apollo/apollo.service';
import { ToastService } from '../../services/toast/toast.service';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  CdkDragPlaceholder,
} from '@angular/cdk/drag-drop';
import { SortBy } from '../../models/types';
import { Column } from '../../models/column.model';
import { Subtask } from 'src/app/models/subtask.model';
import { GetColumnIdsPipe } from '../../pipes/get-column-ids/get-column-ids.pipe';
import { GetColumnsWithoutOneSpecificPipe } from '../../pipes/get-columns-without-one-specific/get-columns-without-one-specific.pipe';
import { FilterByTitlePipe } from '../../pipes/filter-by-title/filter-by-title.pipe';
import { FilterByTagsPipe } from '../../pipes/filter-by-tags/filter-by-tags.pipe';
import { SortTasksPipe } from '../../pipes/sort-tasks/sort-tasks.pipe';
import { DisplayNumberOfUsersInTaskComponent } from '../display-number-of-users-in-task/display-number-of-users-in-task.component';
import { OpenFormButtonComponent } from '../open-form-button/open-form-button.component';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks-kanban-view.component.html',
  styleUrls: ['./tasks-kanban-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    CdkDropList,
    NgFor,
    CdkDrag,
    CdkDragPlaceholder,
    ContextMenuComponent,
    OpenFormButtonComponent,
    DisplayNumberOfUsersInTaskComponent,
    AsyncPipe,
    SortTasksPipe,
    FilterByTagsPipe,
    FilterByTitlePipe,
    GetColumnsWithoutOneSpecificPipe,
    GetColumnIdsPipe,
  ],
})
export class TasksComponent implements OnInit {
  @Input() board: Board | undefined | null = null;
  @Input() searchTerm = '';
  @Input() tags: string[] = [];
  @Input() sortBy!: SortBy;
  allTags = new Observable<string[]>();
  isOwner$ = new Observable<boolean>();

  constructor(
    private apollo: ApolloService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.isOwner$ = this.apollo.isLoggedInUserAOwnerOfTheProject$;
  }

  changeColumn(event: Event) {
    const target = event.target as HTMLSelectElement;

    const columnId = target.value;
    const taskId = target.parentElement?.id ?? '';

    if (!columnId) {
      return;
    }

    this.apollo
      .changeColumn(columnId, taskId)
      .pipe(
        catchError(async error => {
          this.toastService.showToast(
            'warning',
            `Couldn't change the column for this task`
          );
          throw new Error(error);
        })
      )
      .subscribe(() =>
        this.toastService.showToast(
          'confirm',
          'Successfully changed the column for this task'
        )
      );
  }

  dropTask(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      return;
    }
    const id = event.item.element.nativeElement.id;

    const currentColumn = this.board?.columns
      .filter(column => column.id === event.container.id)
      .at(0);

    this.apollo
      .changeColumn(currentColumn?.id ?? '', id)
      .pipe(take(1))
      .subscribe(() =>
        this.toastService.showToast(
          'confirm',
          'Successfully changed the column for this task'
        )
      );
  }

  dropColumn(event: CdkDragDrop<Column[]>) {
    if (event.previousIndex === event.currentIndex) {
      return;
    }
    const currOrder = event.container.data?.at(event.currentIndex)?.order;

    const prevOrder = event.container.data?.at(event.previousIndex)?.order;

    if (currOrder === undefined) return;
    if (prevOrder === undefined) return;

    const currColumnId = event.container.data?.at(event.currentIndex)?.id;
    const prevColumnId = event.container.data?.at(event.previousIndex)?.id;

    this.apollo
      .changeColumnOrder(
        currOrder,
        prevOrder,
        currColumnId ?? '',
        prevColumnId ?? ''
      )
      .pipe(
        catchError(async error => {
          this.toastService.showToast(
            'warning',
            `Couldn't change the order of the columns`
          );
          throw new Error(error);
        })
      )
      .subscribe(() =>
        this.toastService.showToast(
          'confirm',
          'Successfully changed the order of the columns'
        )
      );
  }

  onUpdateCompletionStateOfSubtask(event: Event) {
    const target = event.target as HTMLInputElement;
    const id = target.id;

    this.apollo
      .updateCompletionStateOfSubtask(id ?? '', target.checked)
      .subscribe();
  }

  showTimeDifference = (date: Date) => {
    const currentTime = new Date().getTime();

    const seconds =
      Math.floor(currentTime / 1000) -
      Math.floor(new Date(date).getTime() / 1000);
    const minutes = Math.floor((seconds % 3600) / 60);
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(hours / 24);

    if (days >= 1) {
      return `${days}d ago`;
    }
    if (hours >= 1) {
      return `${hours}h ago`;
    }
    if (minutes >= 1) {
      return `${minutes}m ago`;
    }

    return `${seconds}s ago`;
  };

  columnTrackBy(_index: number, column: Column) {
    return column.id;
  }

  taskTrackBy(_index: number, task: Task) {
    return task.id;
  }

  subtaskTrackBy(_index: number, subtask: Subtask) {
    return subtask.id;
  }
}
