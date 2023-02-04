import { Component, Input, OnInit } from '@angular/core';
import { Board, FormType, Task } from '../../types';
import { BoardService } from '../board.service';
import { FormService } from '../form/form.service';
import { Observable, catchError, map } from 'rxjs';
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
export class BoardDetailsComponent implements OnInit {
  @Input() selectedBoard: Board | undefined | null = null;
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

  getColumns(columnId: string, selectedBoard: Board | null | undefined) {
    return (
      selectedBoard?.columns.filter(column => column.id !== columnId) ?? []
    );
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

      const id = event.item.element.nativeElement.id;

      const currentColumn = this.selectedBoard?.columns
        .filter(column => column.id === event.container.id)
        .at(0);

      if (!currentColumn) return;

      this.apollo
        .changeColumn(currentColumn.id, id)
        .pipe(
          catchError(async error => {
            this.toastService.showWarningToast('update', 'task');
            throw new Error(error);
          })
        )
        .subscribe();
    }
  }
}
