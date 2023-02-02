import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormType, ToastType } from 'src/app/types';

type Operation = 'add' | 'delete' | 'update';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  message = new Subject<string>();
  show = new BehaviorSubject<boolean>(false);
  type = new BehaviorSubject<ToastType>('confirm');
  timeout: NodeJS.Timeout | null = null;

  constructor() {}

  showWarningToast(operation: Operation, name: FormType) {
    const message = `Error! Couldn't ${operation} ${
      operation === 'add' ? 'a new' : 'this'
    } ${name}`;
    this.type.next('warning');
    this.message.next(message);
    this.show.next(true);

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.closeToast();
    }, 3000);
  }

  showConfirmToast(operation: Operation, name: FormType) {
    const message = `Successfully ${operation}${
      operation === 'add' ? 'ed' : 'd'
    } ${operation === 'add' ? 'a new' : 'this'} ${name}`;
    this.type.next('confirm');
    this.message.next(message);
    this.show.next(true);

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.closeToast();
    }, 3000);
  }

  closeToast() {
    this.show.next(false);
  }
}
