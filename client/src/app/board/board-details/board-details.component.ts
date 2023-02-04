import { Component, OnInit, OnDestroy } from '@angular/core';
import { Board, FormType, Task, User } from '../../types';
import { BoardService } from '../board.service';
import { FormService } from '../form/form.service';
import { Observable, Subscription, catchError, map, tap } from 'rxjs';
import { SupabaseService } from 'src/app/supabase.service';
import { Router } from '@angular/router';
import { ApolloService } from '../apollo.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css'],
})
export class BoardDetailsComponent implements OnInit, OnDestroy {
  selectedBoard!: Board | undefined;
  subscription = new Subscription();
  loggedInUserEmail$: Observable<string | undefined> | null = null;

  constructor(
    private formService: FormService,
    private boardService: BoardService,
    private supabase: SupabaseService,
    private router: Router,
    private apollo: ApolloService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.subscription = this.boardService.selectedBoard.subscribe(board => {
      this.selectedBoard = board;
    });

    this.loggedInUserEmail$ = this.supabase.session.pipe(
      map(data => data?.user.email)
    );
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

  getColumns(columnId: string) {
    return this.selectedBoard?.columns.filter(column => column.id !== columnId);
  }

  onUpdateCompletionStateOfSubtask(event: Event) {
    const target = event.target as HTMLInputElement;

    const id = target.id;

    this.apollo
      .updateCompletionStateOfSubtask(id ?? '', target.checked)
      .subscribe();
  }

  async onLogout() {
    try {
      const { error } = await this.supabase.signOut();
      if (error) {
        console.error(error.message);
      }
      this.router.navigate(['/home']);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
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

      const currColumn = this.selectedBoard?.columns.filter(
        column => column.id === event.container.id
      );

      const id = event.item.element.nativeElement.id;

      if (!currColumn) {
        return;
      }

      this.apollo
        .changeColumn(currColumn.at(0)?.id ?? '', id)
        .pipe(
          catchError(async error => {
            this.toastService.showWarningToast('update', 'task');
            throw new Error(error);
          })
        )
        .subscribe();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
