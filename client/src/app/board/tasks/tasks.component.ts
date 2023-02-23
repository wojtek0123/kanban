import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../../models/board.model';
import { User } from '../../models/user.model';
import { Task } from 'src/app/models/task.model';
import { BoardService } from '../../services/board.service';
import { SupabaseService } from '../../services/supabase.service';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { ApolloService } from 'src/app/services/apollo.service';
import { ToastService } from 'src/app/services/toast.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormType, TabNameAssign } from 'src/app/models/types';
import { FormService } from 'src/app/services/form.service';
import { Column } from 'src/app/models/column.model';
import { ColumnWrapper } from 'src/app/models/columnWrapper.model';
import { AssignUserService } from 'src/app/services/assign-user.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  @Input() selectedBoard$: Observable<Board | undefined> | null = null;
  @Input() searchTerm = '';
  @Input() tags: string[] = [];
  loggedInUser$: Observable<Partial<User> | undefined> | null = null;
  projectOwnerId$: Observable<string> | null = null;
  allTags!: Observable<string[]>;

  constructor(
    private supabase: SupabaseService,
    private boardService: BoardService,
    private apollo: ApolloService,
    private toastService: ToastService,
    private formService: FormService,
    private assignUserService: AssignUserService
  ) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.supabase.getSessionObs.pipe(
      map(data => data?.user)
    );

    this.projectOwnerId$ = this.boardService.getSelectedProject.pipe(
      map(project => project?.userId ?? '')
    );
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

  getColumns(columnId: string, columns: ColumnWrapper[]) {
    return columns
      .flatMap(column => column.column)
      .filter(col => col.id !== columnId);
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      return;
    }
    const id = event.item.element.nativeElement.id;

    const currentColumn$ = this.boardService.getSelectedBoard.pipe(
      map(board =>
        board?.columns
          .flatMap(column => column.column)
          .filter(column => column.id === event.container.id)
          .at(0)
      )
    );

    currentColumn$
      .pipe(
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

  dropColumn(event: CdkDragDrop<Column[] | undefined>) {
    if (event.previousContainer === event.container) {
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

    this.apollo
      .changeColumnWrapper(
        currColumnWrapperId ?? '',
        prevColumnWrapperId ?? '',
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

  onForm(
    type: FormType,
    columnId?: string,
    taskId?: string,
    tabName?: TabNameAssign
  ) {
    this.formService.onChangeFormVisibility(type);
    if (columnId) {
      this.boardService.onChangeSelectedColumnId(columnId);
    }
    if (taskId) {
      this.boardService.onChangeSelectedTaskId(taskId);
    }
    if (tabName) {
      this.assignUserService.changeTab(tabName);
    }
  }

  onUpdateCompletionStateOfSubtask(event: Event) {
    const target = event.target as HTMLInputElement;
    const id = target.id;

    this.apollo
      .updateCompletionStateOfSubtask(id ?? '', target.checked)
      .subscribe();
  }

  showTimeDifference = (createdAt: Date) => {
    const currentTime = new Date().getTime();

    const seconds =
      Math.floor(currentTime / 1000) -
      Math.floor(new Date(createdAt).getTime() / 1000);
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

  columnIds(columnId: string, columns: ColumnWrapper[] | undefined) {
    if (!columns) return [];
    const filteredColumns = columns
      .flatMap(column => column.column)
      .filter(column => column.id !== columnId);
    return [...filteredColumns.map(column => column.id)];
  }

  columns(board: Board | null | undefined) {
    if (!board) return;
    return board.columns.flatMap(column => column.column);
  }
}
