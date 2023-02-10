import { Component, Input } from '@angular/core';
import { FormService } from '../../services/form.service';
import { Task } from '../../models/task.model';
import { Column } from '../../models/column.model';
import { Board } from '../../models/board.model';
import { Subtask } from '../../models/subtask.model';
import { Project } from '../../models/project.model';
import { FormType } from '../../models/types';
import { ContextMenuModalService } from '../../services/context-menu-modal.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css'],
})
export class ContextMenuComponent {
  @Input() id!: string;
  @Input() type!: FormType;
  @Input() editingProject?: Project;
  @Input() editingBoard?: Board | null;
  @Input() editingColumn?: Column;
  @Input() editingTask?: Task;
  @Input() editingSubtask?: Subtask;
  openedContextMenuOfElementId = '';

  constructor(
    private formService: FormService,
    private contextMenuModalService: ContextMenuModalService
  ) {}

  onToggle(id: string) {
    this.openedContextMenuOfElementId = id;
  }

  delete() {
    this.contextMenuModalService.onShow();
    this.contextMenuModalService.id = this.id;
    this.contextMenuModalService.type = this.type;
    this.openedContextMenuOfElementId = '';
  }

  edit() {
    this.openedContextMenuOfElementId = '';
    this.formService.onChangeFormVisibility();

    if (this.type === 'project' && this.editingProject) {
      this.formService.onEditing('project', this.editingProject);
    }
    if (this.type === 'board' && this.editingBoard) {
      this.formService.onEditing('board', this.editingBoard);
    }
    if (this.type === 'column' && this.editingColumn) {
      this.formService.onEditing('column', this.editingColumn);
    }
    if (this.type === 'task' && this.editingTask) {
      this.formService.onEditing('task', this.editingTask);
    }
    if (this.type === 'subtask' && this.editingSubtask) {
      this.formService.onEditing('subtask', this.editingSubtask);
    }
  }
}
