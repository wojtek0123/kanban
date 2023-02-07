import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private showMenu = false;

  getShowMenu() {
    return this.showMenu;
  }

  onMenu() {
    this.showMenu = !this.showMenu;
  }
}
