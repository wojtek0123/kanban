import { Injectable } from '@angular/core';
import { Task, Column, Board, Subtask, Project, FormType } from '../../types';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormService {
  isFormOpen = new BehaviorSubject(false);
  isEditing = new BehaviorSubject(false);
  editingProject?: Project;
  editingBoard?: Board;
  editingColumn?: Column;
  editingTask?: Task;
  editingSubtask?: Subtask;
  typeOfForm = new BehaviorSubject<FormType>('project');

  onChangeFormVisibility(formType?: FormType) {
    this.isFormOpen.next(!this.isFormOpen.value);
    if (formType) {
      this.typeOfForm.next(formType);
      this.isEditing.next(false);
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
