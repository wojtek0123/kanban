import { Pipe, PipeTransform } from '@angular/core';
import { ColumnWrapper } from 'src/app/models/columnWrapper.model';

@Pipe({
  name: 'getColumnIds',
})
export class GetColumnIdsPipe implements PipeTransform {
  transform(columnWrappers: ColumnWrapper[], excludedColumnId: string) {
    return columnWrappers
      .flatMap(columnWrapper => columnWrapper.column)
      .filter(column => column.id !== excludedColumnId)
      .map(column => column.id);
  }
}
