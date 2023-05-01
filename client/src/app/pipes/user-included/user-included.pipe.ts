import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Pipe({
  name: 'userIncluded',
})
export class userIncludedPipe implements PipeTransform {
  transform(users: { user: User }[], userId: string) {
    return users.some(user => user.user.id === userId);
  }
}
