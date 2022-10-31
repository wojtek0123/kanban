import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { FormService, FormType } from './form/form.service';
import { GET_BOARDS } from '../graphql/graphql.queries';
import { Subscription } from 'rxjs';

export interface Board {
  id: string;
  name: string;
  columns: {
    id: string;
    name: string;
    tasks: {
      id: string;
      title: string;
      description: string;
    }[];
  }[];
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit, OnDestroy {
  boards: Board[] = [];
  boardsQuery!: QueryRef<any>;
  boardsSub!: Subscription;
  selectedBoard: Board | undefined;
  selectedColumnId: string = '';

  constructor(private apollo: Apollo, public formService: FormService) {}

  ngOnInit(): void {
    this.boardsQuery = this.apollo.watchQuery<{ Boards: Board[] }>({
      query: GET_BOARDS,
    });

    this.boardsSub = this.boardsQuery.valueChanges.subscribe(result => {
      this.boards = result.data.Boards;
      this.selectedBoard = result.data.Boards[0];
    });
  }

  ngOnDestroy(): void {
    this.boardsSub.unsubscribe();
  }

  onForm(type: FormType, columnId?: string) {
    this.formService.onChangeFormVisibility(type);
    if (columnId) {
      this.selectedColumnId = columnId;
    }
  }

  onChangeSelectedBoard(boardId: string) {
    const board = this.boards.find(board => board.id === boardId);
    this.selectedBoard = board;
  }
}
