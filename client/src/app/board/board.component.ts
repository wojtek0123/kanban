import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { FormService, FormType } from './form/form.service';
import { Subscription } from 'rxjs';
import { BoardService } from './board.service';
import { GET_BOARDS } from '../graphql/graphql.schema';

export interface Task {
  id: string;
  title: string;
  description: string;
}

export interface Column {
  id: string;
  name: string;
  tasks: Task[];
}

export interface Board {
  id: string;
  name: string;
  columns: Column[];
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit, OnDestroy, DoCheck {
  boards: Board[] = [];
  boardsQuery!: QueryRef<any>;
  boardsSub!: Subscription;
  selectedBoard: Board | undefined;

  constructor(
    private apollo: Apollo,
    public formService: FormService,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.boardsQuery = this.apollo.watchQuery<{ boards: Board[] }>({
      query: GET_BOARDS,
    });

    this.boardsSub = this.boardsQuery.valueChanges.subscribe(result => {
      this.boards = result.data.boards;
      if (!this.selectedBoard) {
        this.selectedBoard = result.data.boards[0];
        this.boardService.onChangeSelectedBoard(this.selectedBoard?.id ?? '');
      } else {
        this.boardService.onChangeSelectedBoard(this.selectedBoard?.id ?? '');
      }
    });
  }

  ngDoCheck(): void {
    if (this.selectedBoard?.id !== this.boardService.selectedBoardId.value) {
      this.boardService.selectedBoardId.subscribe(id => {
        this.selectedBoard = this.boards.find(board => board.id === id);
      });
    }
  }

  ngOnDestroy(): void {
    this.boardsSub.unsubscribe();
  }

  onForm(type: FormType, columnId?: string) {
    this.formService.onChangeFormVisibility(type);
    if (columnId) {
      this.boardService.onChangeSelectedColumn(columnId);
    }
  }
}
