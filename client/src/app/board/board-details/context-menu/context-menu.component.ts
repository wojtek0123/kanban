import { Component, Input, OnDestroy } from '@angular/core';
import { FormService } from '../../form/form.service';
import { FormType } from '../../form/form.service';
import { Task, Column, Board } from '../../board.component';
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
  @Input() editingBoard?: Board;
  @Input() editingColumn?: Column;
  @Input() editingTask?: Task;
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
    this.contextMenuModalService.show.next(true);
    this.contextMenuModalService.id = this.id;
    this.contextMenuModalService.type = this.type;
    this.openedContextMenuOfElementId = '';
  }

  edit() {
    this.openedContextMenuOfElementId = '';
    this.formService.onChangeFormVisibility();

    if (this.type === 'board' && this.editingBoard) {
      this.formService.onEditingBoard(this.editingBoard);
      this.formService.typeOfForm.next('board');
    }
    if (this.type === 'column' && this.editingColumn) {
      this.formService.onEditingColumn(this.editingColumn);
      this.formService.typeOfForm.next('column');
    }
    if (this.type === 'task' && this.editingTask) {
      this.formService.onEditingTask(this.editingTask);
      this.formService.typeOfForm.next('task');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
