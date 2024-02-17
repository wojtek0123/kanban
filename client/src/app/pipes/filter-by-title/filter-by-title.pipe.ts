import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../models/task.model';

@Pipe({
  name: 'filterByTitle',
  standalone: true,
})
export class FilterByTitlePipe implements PipeTransform {
  transform(tasks: Task[], searchTerm: string) {
    return tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
