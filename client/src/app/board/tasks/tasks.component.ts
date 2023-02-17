import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Board } from '../../models/board.model';
import { User } from '../../models/user.model';
import { Task } from 'src/app/models/task.model';
import { BoardService } from '../../services/board.service';
import { SupabaseService } from '../../services/supabase.service';
import {
  catchError,
  concatAll,
  exhaustMap,
  map,
  switchAll,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { ApolloService } from 'src/app/services/apollo.service';
import { ToastService } from 'src/app/services/toast.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormType } from 'src/app/models/types';
import { FormService } from 'src/app/services/form.service';

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
    private formService: FormService
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
          this.toastService.showWarningToast('update', 'task');
          throw new Error(error);
        })
      )
      .subscribe();
  }

  getColumns(columnId: string, selectedBoard: Board | null | undefined) {
    return (
      selectedBoard?.columns.filter(column => column.id !== columnId) ?? []
    );
  }

  drop(event: CdkDragDrop<Task[]>) {
    const prevArray = [...event.previousContainer.data];
    const currArray = [...event.container.data];

    if (event.previousContainer === event.container) {
      moveItemInArray(currArray, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        prevArray,
        currArray,
        event.previousIndex,
        event.currentIndex
      );

      const id = event.item.element.nativeElement.id;

      const currentColumn$ = this.boardService.getSelectedBoard.pipe(
        map(board =>
          board?.columns
            .filter(column => column.id === event.container.id)
            .at(0)
        )
      );

      currentColumn$
        .pipe(
          switchMap(column => this.apollo.changeColumn(column?.id ?? '', id)),
          catchError(async error => {
            this.toastService.showWarningToast('update', 'task');
            throw new Error(error);
          }),
          take(1)
        )
        .subscribe();
    }
  }

  onForm(type: FormType, columnId?: string, taskId?: string) {
    this.formService.onChangeFormVisibility(type);
    if (columnId) {
      this.boardService.onChangeSelectedColumnId(columnId);
    }
    if (taskId) {
      this.boardService.onChangeSelectedTaskId(taskId);
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
}
