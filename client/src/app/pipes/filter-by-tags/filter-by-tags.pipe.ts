import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../models/task.model';

@Pipe({
  name: 'filterByTags',
  standalone: true,
})
export class FilterByTagsPipe implements PipeTransform {
  transform(tasks: Task[], tags: string[]) {
    return tasks.filter(task =>
      task.tagNames.length === 0
        ? tags.some(tagName => tagName === '')
        : task.tagNames.some(tagName => tags.some(tag => tag === tagName))
    );
  }
}
