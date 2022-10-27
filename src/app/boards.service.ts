import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Board {
  name: string;
  columns: {
    name: string;
    tasks: {
      title: string;
      description: string;
      subtasks: string[];
    }[];
  }[];
}

@Injectable({ providedIn: 'root' })
export class BoardsService {
  boards: Board[] = [
    {
      name: 'platform launch',
      columns: [
        {
          name: 'new request',
          tasks: [
            {
              title: 'Add header',
              description: 'Create h1 tag with text Welcome',
              subtasks: [],
            },
            {
              title: 'Create comment section',
              description:
                'Comment section with user name, avatar and message. Also, add reply feature',
              subtasks: [],
            },
          ],
        },
        {
          name: 'in progress',
          tasks: [
            {
              title: 'Add header',
              description: 'Create h1 tag with text Welcome',
              subtasks: [],
            },
            {
              title: 'Create comment section',
              description:
                'Comment section with user name, avatar and message. Also, add reply feature',
              subtasks: [],
            },
          ],
        },
        {
          name: 'complete',
          tasks: [
            {
              title: 'Add header',
              description: 'Create h1 tag with text Welcome',
              subtasks: [],
            },
            {
              title: 'Create comment section',
              description:
                'Comment section with user name, avatar and message. Also, add reply feature',
              subtasks: [],
            },
          ],
        },
      ],
    },
  ];
  selectedBoard = new BehaviorSubject<Board>(this.boards[0]);

  onChangeSelectedBoard(boardName: string) {
    const boardFound = this.boards.find(board => board.name === boardName);
    if (boardFound) {
      this.selectedBoard.next(boardFound);
    }
  }

  onAddBoard(newBoardName: string) {
    const newBoard: Board = {
      name: newBoardName,
      columns: [
        {
          name: 'new request',
          tasks: [],
        },
      ],
    };

    this.boards.push(newBoard);
  }

  onAddColumn(newColumnName: string) {
    const newColumn = {
      name: newColumnName,
      tasks: [],
    };
    this.boards
      .find(board => board === this.selectedBoard.getValue())
      ?.columns.push(newColumn);
  }
}
