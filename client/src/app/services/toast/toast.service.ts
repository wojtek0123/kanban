import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastType } from 'src/app/models/types';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _show$ = new BehaviorSubject<boolean>(false);
  private _timeout: NodeJS.Timeout | null = null;
  private _toast$ = new BehaviorSubject<{ type: ToastType; message: string }>({
    type: 'confirm',
    message: '',
  });

  get show$() {
    return this._show$.asObservable();
  }

  get toast$() {
    return this._toast$.asObservable();
  }

  showToast(type: ToastType, message: string) {
    this._toast$.next({ type, message });
    this._show$.next(true);

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
