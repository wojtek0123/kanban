import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../../models/board.model';
import { Task } from '../../models/task.model';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { ApolloService } from '../../services/apollo/apollo.service';
import { ToastService } from '../../services/toast/toast.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { SortBy } from '../../models/types';
import { Column } from '../../models/column.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements OnInit {
  @Input() selectedBoard$: Observable<Board | undefined> | null = null;
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

    const currentColumn$ = this.selectedBoard$?.pipe(
      map(board =>
        board?.columns
          .flatMap(column => column.column)
          .filter(column => column.id === event.container.id)
          .at(0)
      )
    );

    currentColumn$
      ?.pipe(
        switchMap(column => this.apollo.changeColumn(column?.id ?? '', id)),
        catchError(async error => {
          this.toastService.showToast(
            'warning',
            `Couldn't change the column for this task`
          );
          throw new Error(error);
        }),
        take(1)
      )
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
    const currColumnWrapperId = event.container.data?.at(
      event.currentIndex
    )?.columnWrapperId;

    const prevColumnWrapperId = event.container.data?.at(
      event.previousIndex
    )?.columnWrapperId;

    const currColumnId = event.container.data?.at(event.currentIndex)?.id;
    const prevColumnId = event.container.data?.at(event.previousIndex)?.id;

    this.selectedBoard$
      ?.pipe(
        map(board => board?.id ?? ''),
        switchMap(boardId =>
          this.apollo.changeColumnWrapper(
            currColumnWrapperId ?? '',
            prevColumnWrapperId ?? '',
            currColumnId ?? '',
            prevColumnId ?? '',
            boardId
          )
        ),
        catchError(async error => {
          this.toastService.showToast(
            'warning',
            `Couldn't change the order of the columns`
          );
          throw new Error(error);
        }),
        take(1)
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
}
