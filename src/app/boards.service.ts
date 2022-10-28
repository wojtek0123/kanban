import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Board {
  name: string;
  columns: {
    name: string;
    tasks: {
      title: string;
      description: string;
      // subtasks: string[];
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
              // subtasks: [],
            },
            {
              title: 'Create comment section',
              description:
                'Comment section with user name, avatar and message. Also, add reply feature',
              // subtasks: [],
            },
          ],
        },
        {
          name: 'in progress',
          tasks: [
            {
              title: 'Add header',
              description: 'Create h1 tag with text Welcome',
              // subtasks: [],
            },
            {
              title: 'Create comment section',
              description:
                'Comment section with user name, avatar and message. Also, add reply feature',
              // subtasks: [],
            },
          ],
        },
        {
          name: 'complete',
          tasks: [
            {
              title: 'Add header',
              description: 'Create h1 tag with text Welcome',
              // subtasks: [],
            },
            {
              title: 'Create comment section',
              description:
                'Comment section with user name, avatar and message. Also, add reply feature',
              // subtasks: [],
            },
          ],
        },
      ],
    },
  ];
  selectedBoard = new BehaviorSubject<Board>(this.boards[0]);
  selectedColumn = '';

  onChangeSelectedBoard(boardName: string) {
    const boardFound = this.boards.find(board => board.name === boardName);
    if (boardFound) {
      this.selectedBoard.next(boardFound);
    }
  }

  onChangeSelectedColumn(columnName: string) {
    this.selectedColumn = columnName;
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
    this.onChangeSelectedBoard(newBoardName);
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

  onAddTask(x: { title: string; description: string }) {
    const column = this.selectedBoard
      .getValue()
      .columns.find(column => column.name === this.selectedColumn);
    if (!column) {
      return;
    }
    column.tasks.push(x);
  }

  onChangeColumnName(newColumnName: string, oldColumnName: string) {
    this.selectedBoard.getValue().columns.find(column => {
      if (column.name === oldColumnName) {
        column.name = newColumnName;
      }
    });
  }

  onRemoveColumn(columnName: string) {
    const columnIndex = this.selectedBoard
      .getValue()
      .columns.findIndex(column => column.name === columnName);
    console.log(columnIndex);
    this.selectedBoard.getValue().columns.splice(columnIndex, 1);
  }
}
