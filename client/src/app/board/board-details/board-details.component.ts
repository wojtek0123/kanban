import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { FormType } from '../../models/types';
import { Board } from '../../models/board.model';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';
import { BoardService } from '../../services/board.service';
import { FormService } from '../../services/form.service';
import { Observable, catchError, map, tap } from 'rxjs';
import { SupabaseService } from 'src/app/services/supabase.service';
import { Router } from '@angular/router';
import { ApolloService } from '../../services/apollo.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css'],
})
export class BoardDetailsComponent implements OnInit, DoCheck {
  @Input() selectedBoard: Board | undefined | null = null;
  loggedInUser$: Observable<Partial<User> | undefined> | null = null;
  projectOwnerId$: Observable<string> | null = null;
  searchTerm = '';
  tags: string[] = [];
  allTags: Set<string> = new Set();
  show = false;
  boardId = '';

  constructor(
    private formService: FormService,
    private boardService: BoardService,
    private supabase: SupabaseService,
    private router: Router,
    private apollo: ApolloService,
    private toastService: ToastService
  ) {}

  ngDoCheck(): void {
    if (!this.selectedBoard) return;
    if (this.boardId === this.selectedBoard.id) return;
    this.boardId = this.selectedBoard.id;

    this.allTags.clear();

    this.selectedBoard.columns.forEach(column =>
      column.tasks.forEach(task =>
        task.tagNames.forEach(task => this.allTags.add(task))
      )
    );

    this.tags = [''];
    for (const tag of this.allTags) {
      this.tags.push(tag);
    }
  }

  ngOnInit() {
    this.loggedInUser$ = this.supabase.getSessionObs.pipe(
      map(data => data?.user)
    );

    this.projectOwnerId$ = this.boardService.getSelectedProject.pipe(
      map(project => project?.userId ?? '')
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

  onFilter(event: Event) {
    const target = event.target as HTMLInputElement;

    if (!target.classList.contains('checkbox')) return;
    const isChecked = target.checked;

    if (isChecked && !this.tags.includes(target.value)) {
      this.tags = [...this.tags, target.value];
    }

    if (!isChecked && this.tags.includes(target.value)) {
      this.tags = this.tags.filter(tag => tag !== target.value);
    }
  }

  onToggleFilter() {
    this.show = !this.show;
  }
}
