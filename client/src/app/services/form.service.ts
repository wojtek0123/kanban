import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Column } from '../models/column.model';
import { Board } from '../models/board.model';
import { Subtask } from '../models/subtask.model';
import { Project } from '../models/project.model';
import { FormType } from '../models/types';

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
  typeOfForm = new BehaviorSubject<FormType | undefined>(undefined);

  onChangeFormVisibility(formType?: FormType) {
    this.isFormOpen.next(!this.isFormOpen.value);
    this.isEditing.next(false);
    this.typeOfForm.next(formType);
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
