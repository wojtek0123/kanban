import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task, Column, Board } from '../board.component';
export type FormType = 'board' | 'task' | 'column';

@Injectable({ providedIn: 'root' })
export class FormService {
  isFormOpen = false;
  isEditing = false;
  editingBoard?: Board;
  editingColumn?: Column;
  editingTask?: Task;
  typeOfForm = new BehaviorSubject<FormType>('board');

  onChangeFormVisibility(formType?: FormType) {
    this.isFormOpen = !this.isFormOpen;
    if (formType) {
      this.typeOfForm.next(formType);
    }
  }

  onEditingBoard(board: Board) {
    this.isEditing = true;
    this.editingBoard = board;
  }

  onEditingColumn(column: Column) {
    this.isEditing = true;
    this.editingColumn = column;
  }

  onEditingTask(task: Task) {
    this.isEditing = true;
    this.editingTask = task;
  }
}
