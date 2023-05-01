import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Pipe({
  name: 'checkWhetherUserIsIncluded',
})
export class CheckWhetherUserIsIncludedPipe implements PipeTransform {
  transform(users: { user: User }[], userId: string): boolean {
    return users.some(user => user.user.id === userId);
  }
}
