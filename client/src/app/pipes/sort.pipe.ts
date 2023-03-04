import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(items: Task[], direction: 'asc' | 'des', column: keyof Task) {
    let sortedItems: Task[] = [];
    sortedItems =
      direction === 'asc'
        ? this.sortAscending(items, column)
        : this.sortDescending(items, column);

    return sortedItems;
  }

  sortAscending(items: Task[], column: keyof Task) {
    return [
      ...items.slice().sort((a, b) => {
        if (column === 'createdAt')
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );

        if (column === 'updatedAt')
          return (
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );

        if (column === 'title') {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          return 0;
        }
        return 0;
      }),
    ];
  }

  sortDescending(items: Task[], column: keyof Task) {
    return [
      ...items.slice().sort((a, b) => {
        if (column === 'createdAt')
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

        if (column === 'updatedAt')
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );

        if (column === 'title') {
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return -1;
          }
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return 1;
          }
          return 0;
        }
        return 0;
      }),
    ];
  }
}
