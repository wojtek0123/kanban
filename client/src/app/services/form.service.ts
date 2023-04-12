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
  private parentId = new BehaviorSubject('');

  private editingProject?: Project;
  private editingBoard?: Board;
  private editingColumn?: Column;
  private editingTask?: Task;
  private editingSubtask?: Subtask;
  private typeOfForm = new BehaviorSubject<FormType | undefined>(undefined);
  private _enableSelectColumn$ = new BehaviorSubject<boolean | undefined>(
    undefined
  );

  get getParentId() {
    return this.parentId.asObservable();
  }

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

  get selectColumn$() {
    return this._enableSelectColumn$.asObservable();
  }

  onChangeParentId(id: string) {
    this.parentId.next(id);
  }

  onChangeFormVisibility(formType?: FormType, selectColumn?: boolean) {
    this.isFormOpen.next(!this.isFormOpen.value);
    this.typeOfForm.next(formType);
    this._enableSelectColumn$.next(selectColumn);
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
