import { Pipe, PipeTransform } from '@angular/core';
import { ColumnWrapper } from 'src/app/models/columnWrapper.model';

@Pipe({
  name: 'getColumnIds',
})
export class GetColumnIdsPipe implements PipeTransform {
  transform(columnWrappers: ColumnWrapper[], columnId: string): string[] {
    return columnWrappers
      .flatMap(columnWrapper => columnWrapper.column)
      .filter(column => column.id !== columnId)
      .map(column => column.id);
  }
}
