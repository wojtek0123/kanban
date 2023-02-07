import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  showMenu = false;

  onMenu() {
    this.showMenu = !this.showMenu;
  }
}
