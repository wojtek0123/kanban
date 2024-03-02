import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../models/task.model';
import { Tag } from 'src/app/models/tag.interface';

@Pipe({
  name: 'filterByTags',
  standalone: true,
})
export class FilterByTagsPipe implements PipeTransform {
  transform(tasks: Task[], tags: Tag[]) {
    console.log(tags);
    return tasks;
  }
}
