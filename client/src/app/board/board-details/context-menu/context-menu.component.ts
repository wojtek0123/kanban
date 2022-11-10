import { Component, Input } from '@angular/core';
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

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css'],
})
export class ContextMenuComponent {
  @Input() id!: string;
  @Input() type!: FormType;
  @Input() editingObject?: Task | Column | Board;
  showMenu = false;

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
    this.apollo.mutate({
      mutation: mutation,
      variables: {
        id: this.id,
      },
      refetchQueries: [GET_BOARDS],
    });
  }

  edit() {
    this.showMenu = false;
    if (!this.editingObject) {
      return;
    }
    this.formService.onEditing(this.editingObject);
    this.formService.onChangeFormVisibility();
    if (this.editingObject) {
      console.log(this.editingObject);
    }
    //  apollo mutation updates
    // pass the information about the editing object
  }
}
