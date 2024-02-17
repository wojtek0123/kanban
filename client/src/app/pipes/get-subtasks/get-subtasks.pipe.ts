import { Pipe, PipeTransform } from '@angular/core';
import { Board } from 'src/app/models/board.model';

@Pipe({
  name: 'getSubtasks',
  standalone: true,
})
export class GetSubtasksPipe implements PipeTransform {
  transform(board: Board) {
    return board.columns.flatMap(column =>
      column.tasks.flatMap(task => task.subtasks)
    );
  }
}
