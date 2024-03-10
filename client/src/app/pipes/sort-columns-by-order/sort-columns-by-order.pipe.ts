import { Pipe, PipeTransform } from '@angular/core';
import { Column } from 'src/app/models/column.model';

@Pipe({
  name: 'sortColumnsByOrder',
  standalone: true,
})
export class sortColumnsByOrder implements PipeTransform {
  transform(columns: Column[]) {
    return [...columns.sort((a, b) => a.order - b.order)];
  }
}
