import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FormType, ToastType } from 'src/app/models/types';

type Operation = 'add' | 'delete' | 'update';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private message$ = new Subject<string>();
  private show$ = new BehaviorSubject<boolean>(false);
  private type$ = new BehaviorSubject<ToastType>('confirm');
  private timeout: NodeJS.Timeout | null = null;

  constructor() {}

  get getMessage(): Observable<string> {
    return this.message$;
  }

  get getShow(): Observable<boolean> {
    return this.show$;
  }

  get getType(): Observable<ToastType> {
    return this.type$;
  }

  showWarningToast(operation: Operation, name: FormType) {
    const message = `Error! Couldn't ${operation} ${
      operation === 'add' ? 'a new' : 'this'
    } ${name}`;
    this.type$.next('warning');
    this.message$.next(message);
    this.show$.next(true);

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
    this.type$.next('confirm');
    this.message$.next(message);
    this.show$.next(true);

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.closeToast();
    }, 3000);
  }

  closeToast() {
    this.show$.next(false);
  }
}
