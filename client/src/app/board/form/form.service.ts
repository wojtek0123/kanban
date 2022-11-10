import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task, Column, Board } from '../board.component';
export type FormType = 'board' | 'task' | 'column';

@Injectable({ providedIn: 'root' })
export class FormService {
  isFormOpen = false;
  isEditing = false;
  editingObject?: Task | Column | Board;
  typeOfForm = new BehaviorSubject<FormType>('board');

  onChangeFormVisibility(formType?: FormType) {
    this.isFormOpen = !this.isFormOpen;
    if (formType) {
      this.typeOfForm.next(formType);
    }
  }

  onEditing(object: Task | Column | Board) {
    this.isEditing = true;
    this.editingObject = object;
  }
}
