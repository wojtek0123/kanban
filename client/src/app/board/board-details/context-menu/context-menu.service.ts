import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContextMenuService {
  show = false;
  id = '';

  onToggle(id: string) {
    this.id = id;
    this.show = !this.show;
  }
}
