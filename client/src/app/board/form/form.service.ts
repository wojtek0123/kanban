import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task, Column, Board, Subtask, Project } from '../board.component';
export type FormType = 'project' | 'board' | 'task' | 'column' | 'subtask';

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

  onEditingProject(project: Project) {
    this.isEditing = true;
    this.editingProject = project;
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

  onChangeTypeOfForm(type: FormType) {
    this.typeOfForm = type;
  }
}
