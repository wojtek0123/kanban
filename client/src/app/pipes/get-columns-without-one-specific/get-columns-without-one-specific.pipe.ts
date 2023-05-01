import { Pipe, PipeTransform } from '@angular/core';
import { ColumnWrapper } from 'src/app/models/columnWrapper.model';

@Pipe({
  name: 'getColumnsWithoutOneSpecific',
})
export class GetColumnsWithoutOneSpecificPipe implements PipeTransform {
  transform(columns: ColumnWrapper[], columnId: string) {
    return columns
      .flatMap(columnWrapper => columnWrapper.column)
      .filter(column => column.id !== columnId);
  }
}
