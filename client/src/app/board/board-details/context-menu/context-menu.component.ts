import { Component } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css'],
})
export class ContextMenuComponent {
  showMenu = false;

  constructor() {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
