import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FormService, FormType } from './form/form.service';
import { GET_BOARDS } from '../graphql/graphql.queries';

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
export class BoardComponent implements OnInit {
  boards: Board[] = [];
  selectedBoard: Board | undefined;
  constructor(private apollo: Apollo, public formService: FormService) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<{ Boards: Board[] }>({ query: GET_BOARDS })
      .valueChanges.subscribe(result => {
        this.boards = result.data.Boards;
        this.selectedBoard = result.data.Boards[0];
      });
  }

  onForm(type: FormType) {
    this.formService.onChangeFormVisibility(type);
  }

  onChangeSelectedBoard(boardId: string) {
    const board = this.boards.find(board => board.id === boardId);
    this.selectedBoard = board;
  }
}
