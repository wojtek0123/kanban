import { Injectable } from '@angular/core';
import { Task, Column, Board, Subtask, Project, FormType } from '../../types';

@Injectable({ providedIn: 'root' })
export class FormService {
  isFormOpen = false;
  isEditing = false;
  editingProject?: Project;
  editingBoard?: Board;
  editingColumn?: Column;
  editingTask?: Task;
  editingSubtask?: Subtask;
  typeOfForm: FormType = 'project';

  onChangeFormVisibility(formType?: FormType) {
    this.isFormOpen = !this.isFormOpen;
    if (formType) {
      this.typeOfForm = formType;
    }
  }

  onLeaveEditingMode() {
    this.isEditing = false;
  }

  onEditing(type: FormType, object: Project | Board | Column | Task | Subtask) {
    this.isEditing = true;
    this.typeOfForm = type;

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
