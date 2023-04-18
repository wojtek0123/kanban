import { Pipe, PipeTransform } from '@angular/core';
import { Board } from '../../models/board.model';
import { Tag } from 'src/app/models/tag.models';

@Pipe({
  name: 'getTagsFromTasks',
})
export class GetTagsFromTasksPipe implements PipeTransform {
  transform(board: Board): Tag[] {
    const tagNames = board.columns.flatMap(col =>
      col.column.tasks.flatMap(task =>
        task.tagNames.length === 0 ? '' : task.tagNames
      )
    );
    const noDuplicatesTagNames = [...new Set([...tagNames])];
    const tags = noDuplicatesTagNames.map((tag, index) => {
      return { id: index, name: tag, check: true };
    });

    return tags;
  }
}
