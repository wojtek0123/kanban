import { Pipe, PipeTransform } from '@angular/core';
import { Board } from 'src/app/models/board.model';

@Pipe({
  name: 'getTasks',
  standalone: true,
})
export class GetTasksPipe implements PipeTransform {
  transform(board: Board) {
    return board.columns.flatMap(column => column.tasks);
  }
}
