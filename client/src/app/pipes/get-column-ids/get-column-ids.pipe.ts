import { Pipe, PipeTransform } from '@angular/core';
import { Column } from 'src/app/models/column.model';

@Pipe({
  name: 'getColumnIds',
})
export class GetColumnIdsPipe implements PipeTransform {
  transform(columns: Column[], excludedColumnId: string) {
    return columns
      .filter(column => column.id !== excludedColumnId)
      .map(column => column.id);
  }
}
