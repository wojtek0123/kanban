import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormType } from '../models/types';

@Injectable({ providedIn: 'root' })
export class ContextMenuModalService {
  show = new BehaviorSubject<boolean>(false);
  id = '';
  type!: FormType;

  onShow() {
    this.show.next(true);
  }

  onHide() {
    this.show.next(false);
  }
}
