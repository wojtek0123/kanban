import { Injectable } from '@angular/core';

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
}
