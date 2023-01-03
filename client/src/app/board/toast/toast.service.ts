import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  message = new Subject<string>();
  show = new BehaviorSubject<boolean>(false);

  constructor() {}

  showToast(message: string) {
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
