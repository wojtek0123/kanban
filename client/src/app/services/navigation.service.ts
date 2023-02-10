import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private showMenu = new BehaviorSubject<boolean>(false);

  getShowMenu(): Observable<boolean> {
    return this.showMenu;
  }

  onMenu() {
    this.showMenu.next(!this.showMenu.value);
  }
}
