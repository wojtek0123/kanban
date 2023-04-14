import { Pipe, PipeTransform } from '@angular/core';
import { Column } from 'src/app/models/column.model';
import { ColumnWrapper } from 'src/app/models/columnWrapper.model';

@Pipe({
  name: 'getColumnsWithoutOneSpecific',
})
export class GetColumnsWithoutOneSpecificPipe implements PipeTransform {
  transform(columns: ColumnWrapper[], columnId: string): Column[] {
    return columns
      .flatMap(columnWrapper => columnWrapper.column)
      .filter(column => column.id !== columnId);
  }
}
