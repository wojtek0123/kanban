import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export type FormType = 'board' | 'task' | 'column';

@Injectable({ providedIn: 'root' })
export class FormAddTaskService {
  isFormOpen = false;
  typeOfForm = new BehaviorSubject<FormType>('board');

  onChangeFormVisibility(formType?: FormType) {
    this.isFormOpen = !this.isFormOpen;
    if (formType) {
      this.typeOfForm.next(formType);
    }
  }
}
