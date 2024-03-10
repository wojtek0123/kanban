import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getColumns',
  standalone: true,
})
export class GetColumnsPipe implements PipeTransform {
  transform(columnIds: string[] | null, columnId: string) {
    return columnIds?.filter(id => id !== columnId);
  }
}
