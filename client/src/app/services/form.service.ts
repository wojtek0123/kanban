import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Column } from '../models/column.model';
import { Board } from '../models/board.model';
import { Subtask } from '../models/subtask.model';
import { Project } from '../models/project.model';
import { FormType } from '../models/types';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormService {
  private isFormOpen = new BehaviorSubject(false);
  private isEditing = new BehaviorSubject(false);
  private editingProject?: Project;
  private editingBoard?: Board;
  private editingColumn?: Column;
  private editingTask?: Task;
  private editingSubtask?: Subtask;
  private typeOfForm = new BehaviorSubject<FormType | undefined>(undefined);

  get getIsFormOpen(): Observable<boolean> {
    return this.isFormOpen;
  }

  get getIsEditing(): Observable<boolean> {
    return this.isEditing;
  }

  get getTypeOfForm(): Observable<FormType | undefined> {
    return this.typeOfForm;
  }

  get getEditingProject() {
    return this.editingProject;
  }

  get getEditingBoard() {
    return this.editingBoard;
  }

  get getEditingColumn() {
    return this.editingColumn;
  }

  get getEditingTask() {
    return this.editingTask;
  }

  get getEditingSubtask() {
    return this.editingSubtask;
  }

  onChangeFormVisibility(formType?: FormType) {
    this.isFormOpen.next(!this.isFormOpen.value);
    this.isEditing.next(false);
    if (formType) {
      this.typeOfForm.next(formType);
    }
  }

  onEditing(type: FormType, object: Project | Board | Column | Task | Subtask) {
    this.isEditing.next(true);
    this.typeOfForm.next(type);

    switch (type) {
      case 'project':
        this.editingProject = object as Project;
        break;
      case 'board':
        this.editingBoard = object as Board;
        break;
      case 'column':
        this.editingColumn = object as Column;
        break;
      case 'task':
        this.editingTask = object as Task;
        break;
      case 'subtask':
        this.editingSubtask = object as Subtask;
        break;
      default:
        break;
    }
  }
}
