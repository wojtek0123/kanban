import { Component, Input, OnDestroy } from '@angular/core';
import { FormService } from '../../form/form.service';
import { Apollo } from 'apollo-angular';
import {
  REMOVE_BOARD,
  GET_BOARDS,
  REMOVE_COLUMN,
  REMOVE_TASK,
} from '../../../graphql/graphql.schema';
import { FormType } from '../../form/form.service';
import { Task, Column, Board } from '../../board.component';
import { Subscription } from 'rxjs';
import { instanceOf } from 'graphql/jsutils/instanceOf';

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
  showMenu = false;
  subscription: Subscription = new Subscription();

  constructor(private formService: FormService, private apollo: Apollo) {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  delete() {
    console.log(this.type);
    this.showMenu = false;
    let mutation: any;
    if (this.type === 'board') {
      mutation = REMOVE_BOARD;
    }
    if (this.type === 'column') {
      mutation = REMOVE_COLUMN;
    }
    if (this.type === 'task') {
      mutation = REMOVE_TASK;
    }
    this.subscription = this.apollo
      .mutate({
        mutation: mutation,
        variables: {
          id: this.id,
        },
        refetchQueries: [GET_BOARDS],
      })
      .subscribe(value => {
        console.log(value);
      });
  }

  edit() {
    this.showMenu = false;
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
