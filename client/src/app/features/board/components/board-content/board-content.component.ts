import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, firstValueFrom, ignoreElements, map, of, switchMap } from 'rxjs';
import { BoardService } from '../../services/board.service';
import { AsyncPipe } from '@angular/common';
import { LoadingSpinnerComponent } from 'src/app/components/loading-spinner/loading-spinner.component';
import { MatIcon } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { CdkDrag, CdkDragDrop, CdkDropList, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { GetColumnsPipe } from 'src/app/pipes/get-columns/get-columns.pipe';
import { Column } from 'src/app/models/column.model';
import { sortColumnsByOrder } from 'src/app/pipes/sort-columns-by-order/sort-columns-by-order.pipe';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-board-content',
  templateUrl: './board-content.component.html',
  styles: [
    `
      .cdk-drag-preview {
        box-sizing: border-box;
        border-radius: 1rem;
        box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14),
          0 3px 14px 2px rgba(0, 0, 0, 0.12);
      }

      .cdk-drag-animating {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }

      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }

      .cdk-drag-placeholder {
        border-radius: 1rem;
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
        margin-bottom: 1rem;
      }

      .cdk-drop-list {
        min-height: calc(100svh - 18rem);
        height: 100%;
      }
    `,
  ],
  standalone: true,
  imports: [
    AsyncPipe,
    LoadingSpinnerComponent,
    MatIcon,
    MatCheckbox,
    CdkDrag,
    CdkDropList,
    GetColumnsPipe,
    sortColumnsByOrder,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardContentComponent {
  private boardService = inject(BoardService);
  private route = inject(ActivatedRoute);

  columns$ = this.route.params.pipe(
    map(params => params['id']),
    switchMap(boardId => this.boardService.getBoardContent$(boardId)),
    map(res => [...res.data.board.columns])
  );

  columnsError$ = this.columns$.pipe(
    ignoreElements(),
    catchError(err => of(err))
  );

  columnIds$ = this.columns$.pipe(map(columns => columns.map(c => c.id)));

  tasks$ = this.columns$.pipe(map(columns => columns.flatMap(c => c.tasks)));

  async dragAndDropColumns({ previousIndex, currentIndex }: CdkDragDrop<Column[]>) {
    if (previousIndex === currentIndex) return;
    const columns = await firstValueFrom(this.columns$);

    moveItemInArray(columns, previousIndex, currentIndex);

    const updatedColumns = this.updateOrder(columns);

    this.boardService.changeColumnOrder$(updatedColumns).subscribe(() => {
      this.columns$ = of(columns);
    });
  }

  async dragAndDropTasks({ previousIndex, currentIndex, container, previousContainer }: CdkDragDrop<Task[]>) {
    const currContainerId = container.id;
    const prevContainerId = previousContainer.id;
    const columns = await firstValueFrom(this.columns$);

    if (currContainerId === prevContainerId) {
      const tasks = container.data.filter(task => task.columnId === container.id);
      moveItemInArray(tasks, previousIndex, currentIndex);

      // tasks = this.updateOrder(tasks);
      console.log(tasks);
      const column = columns.find(c => c.id === currContainerId);

      if (!column) return;

      const updatedColumn = {
        ...column,
        tasks: tasks,
      };

      // todo: api call to update tasks order
      this.columns$ = of(columns.map(c => (c.id === currContainerId ? updatedColumn : c)));
    } else {
      const tasksData: TasksData = {
        previousTasks: [],
        currentTasks: [],
      };
      container.data.forEach(task => {
        if (task.columnId === currContainerId) tasksData.currentTasks = [...tasksData.currentTasks, task];
        if (task.columnId === prevContainerId) tasksData.previousTasks = [...tasksData.previousTasks, task];
      });

      transferArrayItem(tasksData.previousTasks, tasksData.currentTasks, previousIndex, currentIndex);

      const currColumn = columns.find(c => c.id === currContainerId);

      const prevColumn = columns.find(c => c.id === prevContainerId);

      if (!currColumn || !prevColumn) return;

      const updatedCurrColumn = {
        ...currColumn,
        tasks: tasksData.currentTasks,
      };

      const updatedPrevColumn = {
        ...prevColumn,
        tasks: tasksData.previousTasks,
      };

      this.columns$ = of(
        columns.map(c =>
          c.id === currContainerId ? updatedCurrColumn : c.id === prevContainerId ? updatedPrevColumn : c
        )
      );
      // todo: api call to update tasks order
    }
  }

  private updateOrder<T>(items: T[]) {
    return items.map((item, index) => ({ ...item, order: index }));
  }
}

interface TasksData {
  previousTasks: Task[];
  currentTasks: Task[];
}
