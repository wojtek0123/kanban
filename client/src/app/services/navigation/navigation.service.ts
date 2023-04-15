import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private _showMenu$ = new BehaviorSubject<boolean>(false);

  get showMenu$() {
    return this._showMenu$.asObservable();
  }

  onMenu() {
    this._showMenu$.next(!this._showMenu$.value);
  }
}
