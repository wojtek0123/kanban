import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'filter',
})
export class FilterByTitlePipe implements PipeTransform {
  transform(tasks: Task[], searchTerm: string): Task[] {
    return tasks.filter(task =>
      task.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
  }
}
