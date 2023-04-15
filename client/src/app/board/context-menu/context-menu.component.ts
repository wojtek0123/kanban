import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormService } from '../../services/form.service';
import { Task } from '../../models/task.model';
import { Column } from '../../models/column.model';
import { Board } from '../../models/board.model';
import { Subtask } from '../../models/subtask.model';
import { Project } from '../../models/project.model';
import { FormType } from '../../models/types';
import { ContextMenuModalService } from '../../services/context-menu-modal.service';
import { Observable } from 'rxjs';
import { ApolloService } from 'src/app/services/apollo.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuComponent implements OnInit {
  @Input() id!: string;
  @Input() type!: FormType;
  @Input() editingProject?: Project;

  @Input() editingBoard?: Board;
  @Input() editingColumn?: Column;
  @Input() editingTask?: Task;
  @Input() editingSubtask?: Subtask;
  @Input() isProtected = true;
  openedContextMenuOfElementId = '';
  isOwner$ = new Observable<boolean>();

  constructor(
    private formService: FormService,
    private contextMenuModalService: ContextMenuModalService,
    private apollo: ApolloService
  ) {}

  ngOnInit() {
    this.isOwner$ = this.apollo.isLoggedInUserAOwnerOfTheProject$;
  }

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

    if (this.type === 'project') {
      this.formService.onEdit('project', this.id);
      this.formService.onChangeFormVisibility('project');
    }
    if (this.type === 'board') {
      this.formService.onEdit('board', this.id);
      this.formService.onChangeFormVisibility('board');
    }
    if (this.type === 'column') {
      this.formService.onEdit('column', this.id);
      this.formService.onChangeFormVisibility('column');
    }
    if (this.type === 'task') {
      this.formService.onEdit('task', this.id);
      this.formService.onChangeFormVisibility('task');
    }
    if (this.type === 'subtask') {
      this.formService.onEdit('subtask', this.id);
      this.formService.onChangeFormVisibility('subtask');
    }
  }
}
