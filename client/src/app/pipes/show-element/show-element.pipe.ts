import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showElement',
})
export class ShowElementPipe implements PipeTransform {
  transform(isOwner: boolean | null, isProtected: boolean): boolean {
    if (!isOwner && isProtected) return false;

    return true;
  }
}
