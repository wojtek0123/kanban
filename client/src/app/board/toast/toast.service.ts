import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormType } from 'src/app/types';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  message = new Subject<string>();
  show = new BehaviorSubject<boolean>(false);

  constructor() {}

  showToast(operation: 'add' | 'delete' | 'update', name: FormType) {
    const message = `Error! Couldn't ${operation} ${
      operation === 'add' ? 'a new' : 'this'
    } ${name}`;
    this.message.next(message);
    this.show.next(true);

    setTimeout(() => {
      this.closeToast();
    }, 3000);
  }

  closeToast() {
    this.show.next(false);
  }
}
