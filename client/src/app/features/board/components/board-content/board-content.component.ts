import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, firstValueFrom, ignoreElements, map, of, switchMap } from 'rxjs';
import { BoardService } from '../../services/board.service';
import { AsyncPipe } from '@angular/common';
import { LoadingSpinnerComponent } from 'src/app/components/loading-spinner/loading-spinner.component';
import { MatIcon } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
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
    map(board => [...board.columns].sort((a, b) => a.order - b.order))
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
    const orderedColumns = new Map<number, Column | undefined>();

    columns.forEach((column, index) => orderedColumns.set(index, column));

    const [prevItem, currItem] = [orderedColumns.get(previousIndex), orderedColumns.get(currentIndex)];
    if (Math.abs(currentIndex - previousIndex) === 1) {
      orderedColumns.set(previousIndex, currItem);
    }
    if (currentIndex > previousIndex) {
      for (let i = previousIndex; i < currentIndex; i++) {
        const y = orderedColumns.get(i + 1);
        orderedColumns.set(i, y);
      }
    }
    orderedColumns.set(currentIndex, prevItem);
    const x = Array.from(orderedColumns?.values()).map((column, index) => ({ ...column, order: index }));
    console.log(x);

    // todo: api call to update columns order
  }

  dragAndDropTasks(event: CdkDragDrop<Task[]>) {
    //if (event.previousContainer === event.container) return;
    console.log(event);

    console.log(event.previousIndex, event.currentIndex);
    // const id = event.item.element.nativeElement.id;

    //const currentColumn = this.board?.columns.filter(column => column.id === event.container.id).at(0);
    //
    const currContainerId = event.container.id;
    const prevContainerId = event.previousContainer.id;

    if (currContainerId === prevContainerId) {
      // todo: update task order
      console.log('Update task order');
    } else {
      // todo: update task order and column id
      console.log('Update task order and column id');
    }
  }
}
