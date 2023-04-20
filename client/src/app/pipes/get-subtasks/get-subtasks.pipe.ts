import { Pipe, PipeTransform } from '@angular/core';
import { Board } from 'src/app/models/board.model';
import { Subtask } from 'src/app/models/subtask.model';

@Pipe({
  name: 'getSubtasks',
})
export class GetSubtasksPipe implements PipeTransform {
  transform(board: Board): Subtask[] {
    return board.columns.flatMap(columnWrapper =>
      columnWrapper.column.tasks.flatMap(task => task.subtasks)
    );
  }
}
