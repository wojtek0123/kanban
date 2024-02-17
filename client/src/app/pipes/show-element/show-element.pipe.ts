import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showElement',
  standalone: true,
})
export class ShowElementPipe implements PipeTransform {
  transform(isOwner: boolean | null, isProtected: boolean) {
    return !isOwner && isProtected ? false : true;
  }
}
