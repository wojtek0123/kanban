import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../models/task.model';

@Pipe({
  name: 'sortTasks',
})
export class SortTasksPipe implements PipeTransform {
  transform(items: Task[], direction: 'asc' | 'des', column: keyof Task) {
    if (items.length === 0) return [];

    const sortedItems =
      direction === 'asc'
        ? this.sortAscending(items, column)
        : this.sortDescending(items, column);

    return sortedItems;
  }

  private sortAscending(items: Task[], column: keyof Task) {
    return items.slice().sort((a, b) => {
      if (column === 'createdAt')
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

      if (column === 'updatedAt')
        return (
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );

      if (column === 'title') {
        return a.title.localeCompare(b.title, undefined, {
          sensitivity: 'base',
        });
      }
      return 0;
    });
  }

  private sortDescending(items: Task[], column: keyof Task) {
    return items.slice().sort((a, b) => {
      if (column === 'createdAt')
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      if (column === 'updatedAt')
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );

      if (column === 'title') {
        return b.title.localeCompare(a.title, undefined, {
          sensitivity: 'base',
        });
      }
      return 0;
    });
  }
}
