import { Pipe, PipeTransform } from '@angular/core';
import { Board } from '../../models/board.model';
import { Tag } from 'src/app/models/tag.models';

@Pipe({
  name: 'getTagsFromTasks',
})
export class GetTagsFromTasksPipe implements PipeTransform {
  transform(board: Board) {
    const uniqueTagNames = new Set([
      ...board.columns.flatMap(col =>
        col.column.tasks.flatMap(task =>
          task.tagNames.length === 0 ? '' : task.tagNames
        )
      ),
    ]);

    return Array.from(uniqueTagNames).map((name, index) => ({
      id: index,
      name,
      check: true,
    })) satisfies Tag[];
  }
}
