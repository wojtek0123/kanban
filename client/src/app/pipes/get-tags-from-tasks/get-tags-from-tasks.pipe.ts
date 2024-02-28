import { Pipe, PipeTransform } from '@angular/core';
import { Board } from '../../models/board.model';

@Pipe({
  name: 'getTagsFromTasks',
  standalone: true,
})
export class GetTagsFromTasksPipe implements PipeTransform {
  transform(board: Board) {
    const tags = [
      ...new Set([
        ...board.columns.flatMap(column =>
          column.tasks.flatMap(task => (task.tagNames.length === 0 ? '' : task.tagNames))
        ),
      ]),
    ];

    return tags.map((tag, index) => ({ name: tag, check: true, id: index }));
  }
}
