import { Pipe, PipeTransform } from '@angular/core';
import { Board } from 'src/app/models/board.model';

@Pipe({
  name: 'getColumns',
})
export class GetColumnsPipe implements PipeTransform {
  transform(board: Board | null | undefined) {
    return board?.columns.flatMap(column => column.column) ?? [];
  }
}
