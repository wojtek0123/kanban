import { Pipe, PipeTransform } from '@angular/core';
import { Column } from 'src/app/models/column.model';

@Pipe({
  name: 'getColumnsWithoutOneSpecific',
})
export class GetColumnsWithoutOneSpecificPipe implements PipeTransform {
  transform(columns: Column[], columnId: string) {
    return columns.filter(column => column.id !== columnId);
  }
}
