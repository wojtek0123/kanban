import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ToastType } from 'src/app/models/types';

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

  showToast(type: ToastType, message: string) {
    this.type$.next(type);
    this.show$.next(true);
    this.message$.next(message);

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
