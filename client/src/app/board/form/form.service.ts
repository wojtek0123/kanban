import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task, Column, Board, Subtask } from '../board.component';
export type FormType = 'board' | 'task' | 'column' | 'subtask';

@Injectable({ providedIn: 'root' })
export class FormService {
  isFormOpen = false;
  isEditing = false;
  editingBoard?: Board;
  editingColumn?: Column;
  editingTask?: Task;
  editingSubtask?: Subtask;
  typeOfForm = new BehaviorSubject<FormType>('board');

  onChangeFormVisibility(formType?: FormType) {
    this.isFormOpen = !this.isFormOpen;
    if (formType) {
      this.typeOfForm.next(formType);
    }
  }

  onLeaveEditingMode() {
    this.isEditing = false;
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

  onEditingSubtask(subtask: Subtask) {
    this.isEditing = true;
    this.editingSubtask = subtask;
  }
}
