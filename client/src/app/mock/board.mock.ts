import { Board } from '../models/board.model';

export const board: Board = {
  id: '1234',
  name: 'Project Board',
  columns: [
    {
      id: '5678',
      column: {
        id: '9012',
        name: 'To Do',
        dotColor: '#FFA500',
        tasks: [
          {
            id: '3456',
            title: 'Task 1',
            description: 'Finish project proposal',
            subtasks: [
              {
                id: 'subtask-1',
                name: 'Subtask 1',
                isFinished: false,
                createdAt: new Date('2023-05-01T00:00:00Z'),
                updatedAt: new Date('2023-05-01T00:00:00Z'),
              },
              {
                id: 'subtask-2',
                name: 'Subtask 2',
                isFinished: true,
                createdAt: new Date('2023-05-01T01:00:00Z'),
                updatedAt: new Date('2023-05-01T02:00:00Z'),
              },
            ],
            tagBackgroundColors: [],
            tagFontColors: [],
            tagNames: ['tech', 'news'],
            createdAt: new Date('2023-05-01T08:00:00Z'),
            updatedAt: new Date('2023-05-01T08:00:00Z'),
            columnName: '',
          },
          {
            id: '7890',
            title: 'Task 2',
            description: 'Research competitors',
            subtasks: [
              {
                id: 'subtask-3',
                name: 'Subtask 3',
                isFinished: false,
                createdAt: new Date('2023-05-01T03:00:00Z'),
                updatedAt: new Date('2023-05-01T03:00:00Z'),
              },
            ],
            tagBackgroundColors: [],
            tagFontColors: [],
            tagNames: ['healthy', 'food', 'fitness', 'motivation', 'news'],
            columnName: '',
            createdAt: new Date('2023-05-01T09:00:00Z'),
            updatedAt: new Date('2023-05-01T09:00:00Z'),
          },
        ],
        columnWrapperId: '1111',
        createdAt: new Date('2023-05-01T07:00:00Z'),
        updatedAt: new Date('2023-05-01T07:00:00Z'),
      },
    },
    {
      id: '2345',
      column: {
        id: '6789',
        name: 'In Progress',
        dotColor: '#00FF00',
        tasks: [
          {
            id: '1234',
            title: 'Task 3',
            description: 'Create wireframes',
            subtasks: [
              {
                id: 'subtask-4',
                name: 'Subtask 4',
                isFinished: true,
                createdAt: new Date('2023-05-01T04:00:00Z'),
                updatedAt: new Date('2023-05-01T05:00:00Z'),
              },
            ],
            tagBackgroundColors: [],
            tagFontColors: [],
            tagNames: ['adventure', 'time', 'fashionista', 'food', 'healthy'],
            columnName: '',
            createdAt: new Date('2023-05-01T10:00:00Z'),
            updatedAt: new Date('2023-05-01T10:00:00Z'),
          },
        ],
        columnWrapperId: '1111',
        createdAt: new Date('2023-05-01T07:00:00Z'),
        updatedAt: new Date('2023-05-01T07:00:00Z'),
      },
    },
    {
      id: '3456',
      column: {
        id: '7890',
        name: 'Done',
        dotColor: '#0000FF',
        tasks: [
          {
            id: '5678',
            title: 'Task 4',
            subtasks: [
              {
                id: 'subtask-5',
                name: 'Subtask 5',
                isFinished: false,
                createdAt: new Date('2023-05-01T06:00:00Z'),
                updatedAt: new Date('2023-05-01T06:00:00Z'),
              },
              {
                id: 'subtask-6',
                name: 'Subtask 6',
                isFinished: true,
                createdAt: new Date('2023-05-01T07:00:00Z'),
                updatedAt: new Date('2023-05-01T08:00:00Z'),
              },
              {
                id: 'subtask-7',
                name: 'Subtask 7',
                isFinished: false,
                createdAt: new Date('2023-05-01T09:00:00Z'),
                updatedAt: new Date('2023-05-01T09:00:00Z'),
              },
            ],
            tagBackgroundColors: [],
            tagFontColors: [],
            tagNames: [],
            columnName: '',
            description: 'Create presentation',
            createdAt: new Date('2023-05-01T11:00:00Z'),
            updatedAt: new Date('2023-05-01T11:00:00Z'),
          },
        ],
        columnWrapperId: '1111',
        createdAt: new Date('2023-05-01T07:00:00Z'),
        updatedAt: new Date('2023-05-01T07:00:00Z'),
      },
    },
  ],
  projectId: 'abcd',
  createdAt: new Date('2023-05-01T06:00:00Z'),
  updatedAt: new Date('2023-05-01T06:00:00Z'),
};

export const boardWithoutTasks = {
  id: '1234',
  name: 'Project Board',
  columns: [
    {
      id: '5678',
      column: {
        id: '9012',
        name: 'To Do',
        dotColor: '#FFA500',
        tasks: [],
        columnWrapperId: '1111',
        createdAt: new Date('2023-05-01T07:00:00Z'),
        updatedAt: new Date('2023-05-01T07:00:00Z'),
      },
    },
    {
      id: '2345',
      column: {
        id: '6789',
        name: 'In Progress',
        dotColor: '#00FF00',
        tasks: [],
        columnWrapperId: '1111',
        createdAt: new Date('2023-05-01T07:00:00Z'),
        updatedAt: new Date('2023-05-01T07:00:00Z'),
      },
    },
    {
      id: '3456',
      column: {
        id: '7890',
        name: 'Done',
        dotColor: '#0000FF',
        tasks: [],
        columnWrapperId: '1111',
        createdAt: new Date('2023-05-01T07:00:00Z'),
        updatedAt: new Date('2023-05-01T07:00:00Z'),
      },
    },
  ],
  projectId: 'abcd',
  createdAt: new Date('2023-05-01T06:00:00Z'),
  updatedAt: new Date('2023-05-01T06:00:00Z'),
};

export const boardWithoutColumns = {
  id: '1234',
  name: 'Project Board',
  columns: [],
  projectId: 'abcd',
  createdAt: new Date('2023-05-01T06:00:00Z'),
  updatedAt: new Date('2023-05-01T06:00:00Z'),
};
