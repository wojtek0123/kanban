import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FormAddTaskService {
  isFormOpen = false;

  onChangeFormVisibility() {
    this.isFormOpen = !this.isFormOpen;
  }
}
