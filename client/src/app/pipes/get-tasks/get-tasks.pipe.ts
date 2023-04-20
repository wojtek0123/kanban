import { Pipe, PipeTransform } from '@angular/core';
import { Board } from 'src/app/models/board.model';
import { Task } from 'src/app/models/task.model';

@Pipe({
  name: 'getTasks',
})
export class GetTasksPipe implements PipeTransform {
  transform(board: Board): Task[] {
    return board.columns.flatMap(columnWrapper => columnWrapper.column.tasks);
  }
}
