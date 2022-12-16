import { Component, Input, OnDestroy } from '@angular/core';
import { FormService } from '../form/form.service';
import { Task, Column, Board, Subtask, Project, FormType } from '../../types';
import { Subscription } from 'rxjs';
import { ContextMenuModalService } from '../context-menu-modal/context-menu-modal.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css'],
})
export class ContextMenuComponent implements OnDestroy {
  @Input() id!: string;
  @Input() type!: FormType;
  @Input() editingProject?: Project;
  @Input() editingBoard?: Board;
  @Input() editingColumn?: Column;
  @Input() editingTask?: Task;
  @Input() editingSubtask?: Subtask;
  openedContextMenuOfElementId = '';
  subscription: Subscription = new Subscription();

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

    if (this.type === 'board' && this.editingBoard) {
      this.formService.onEditingBoard(this.editingBoard);
      this.formService.onChangeTypeOfForm('board');
    }
    if (this.type === 'column' && this.editingColumn) {
      this.formService.onEditingColumn(this.editingColumn);
      this.formService.onChangeTypeOfForm('column');
    }
    if (this.type === 'task' && this.editingTask) {
      this.formService.onEditingTask(this.editingTask);
      this.formService.onChangeTypeOfForm('task');
    }
    if (this.type === 'subtask' && this.editingSubtask) {
      this.formService.onEditingSubtask(this.editingSubtask);
      this.formService.onChangeTypeOfForm('subtask');
    }
    if (this.type === 'project' && this.editingProject) {
      this.formService.onEditingProject(this.editingProject);
      this.formService.onChangeTypeOfForm('project');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
