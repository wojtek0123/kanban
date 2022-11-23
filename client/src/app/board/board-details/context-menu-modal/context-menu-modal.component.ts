import { Component, OnInit } from '@angular/core';
import { ContextMenuModalService } from './context-menu-modal.service';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import {
  GET_BOARDS,
  REMOVE_BOARD,
  REMOVE_COLUMN,
  REMOVE_SUBTASK,
  REMOVE_TASK,
} from 'src/app/graphql/graphql.schema';

@Component({
  selector: 'app-context-menu-modal',
  templateUrl: './context-menu-modal.component.html',
  styleUrls: ['./context-menu-modal.component.css'],
})
export class ContextMenuModalComponent implements OnInit {
  show = false;
  subscription: Subscription = new Subscription();

  constructor(
    private contextMenuModalService: ContextMenuModalService,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.subscription = this.contextMenuModalService.show.subscribe(value => {
      this.show = value;
      console.log(value);
    });
  }

  onHide() {
    this.contextMenuModalService.show.next(false);
  }

  onDelete() {
    this.contextMenuModalService.show.next(false);

    let mutation: any;
    if (this.contextMenuModalService.type === 'board') {
      mutation = REMOVE_BOARD;
    }
    if (this.contextMenuModalService.type === 'column') {
      mutation = REMOVE_COLUMN;
    }
    if (this.contextMenuModalService.type === 'task') {
      mutation = REMOVE_TASK;
    }
    if (this.contextMenuModalService.type === 'subtask') {
      mutation = REMOVE_SUBTASK;
    }
    this.subscription = this.apollo
      .mutate({
        mutation: mutation,
        variables: {
          id: this.contextMenuModalService.id,
        },
        refetchQueries: [GET_BOARDS],
      })
      .subscribe(value => {
        console.log(value);
      });
  }
}
