import { Pipe, PipeTransform } from '@angular/core';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';

@Pipe({
  name: 'getColumns',
})
export class GetColumnsPipe implements PipeTransform {
  transform(board: Board | null | undefined): Column[] {
    return board?.columns.flatMap(column => column.column) ?? [];
  }
}
