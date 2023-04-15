import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormType } from '../../models/types';

@Injectable({ providedIn: 'root' })
export class ContextMenuModalService {
  private _show$ = new BehaviorSubject<boolean>(false);
  private _id = '';
  private _type!: FormType;

  get id() {
    return this._id;
  }

  get type() {
    return this._type;
  }

  get show$() {
    return this._show$.asObservable();
  }

  onShow(type: FormType, id: string) {
    this._show$.next(true);
    this._type = type;
    this._id = id;
  }

  onHide() {
    this._show$.next(false);
  }
}
