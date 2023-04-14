import { Pipe, PipeTransform } from '@angular/core';
import { Board } from '../../models/board.model';

@Pipe({
  name: 'getTagsFromTasks',
})
export class GetTagsFromTasksPipe implements PipeTransform {
  transform(board: Board): string[] {
    if (!board) return ['tu tez'];

    const tags = board.columns.flatMap(col =>
      col.column.tasks.flatMap(task => task.tagNames)
    );

    return [...new Set([...tags])];
  }
}
