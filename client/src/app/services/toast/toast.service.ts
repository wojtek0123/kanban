import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ToastType } from 'src/app/models/types';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _message$ = new Subject<string>();
  private _show$ = new BehaviorSubject<boolean>(false);
  private _type$ = new BehaviorSubject<ToastType>('confirm');
  private _timeout: NodeJS.Timeout | null = null;

  constructor() {}

  get message$() {
    return this._message$.asObservable();
  }

  get show$() {
    return this._show$.asObservable();
  }

  get type$() {
    return this._type$.asObservable();
  }

  showToast(type: ToastType, message: string) {
    this._type$.next(type);
    this._show$.next(true);
    this._message$.next(message);

    if (this._timeout) {
      clearTimeout(this._timeout);
    }

    this._timeout = setTimeout(() => {
      this.closeToast();
    }, 3000);
  }

  closeToast() {
    this._show$.next(false);
  }
}
