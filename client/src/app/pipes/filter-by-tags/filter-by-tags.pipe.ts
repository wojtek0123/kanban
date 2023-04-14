import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../models/task.model';

@Pipe({
  name: 'filterByTags',
})
export class FilterByTagsPipe implements PipeTransform {
  transform(tasks: Task[], tags: string[]): Task[] {
    return tasks.filter(task =>
      task.tagNames.length === 0
        ? tags.includes('')
        : task.tagNames.some(tagName => tags.includes(tagName))
    );
  }
}
