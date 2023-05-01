import { Task } from '../models/task.model';

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Create a blog post about new product features',
    description:
      'Write a blog post about the new features that have been added to our product and how they benefit our users.',
    tagNames: ['Content Creation', 'Marketing', 'Organize'],
    tagFontColors: ['#ffffff', '#ffffff'],
    tagBackgroundColors: ['#2c3e50', '#3498db'],
    columnName: 'To Do',
    subtasks: [],
    createdAt: new Date('2023-04-30T10:00:00Z'),
    updatedAt: new Date('2023-04-30T11:00:00Z'),
  },
  {
    id: '2',
    title: 'Organize a team outing to the beach',
    description:
      'Plan a day trip to the beach for the team to enjoy some sun, sand, and surf!',
    tagNames: ['Team Building', 'Event Planning', 'Organize'],
    tagFontColors: ['#ffffff', '#ffffff'],
    tagBackgroundColors: ['#e67e22', '#d35400'],
    columnName: 'In Progress',
    subtasks: [],
    createdAt: new Date('2023-04-29T14:00:00Z'),
    updatedAt: new Date('2023-04-30T10:30:00Z'),
  },
  {
    id: '3',
    title: 'Develop a new search feature for the app',
    description:
      'Create a more advanced search feature that allows users to filter and sort results based on different criteria.',
    tagNames: [],
    tagFontColors: ['#ffffff', '#ffffff'],
    tagBackgroundColors: ['#27ae60', '#2ecc71'],
    columnName: 'In Progress',
    subtasks: [],
    createdAt: new Date('2023-04-28T09:00:00Z'),
    updatedAt: new Date('2023-04-30T09:30:00Z'),
  },
  {
    id: '4',
    title: 'Develop a modern website',
    description:
      'Create a more advanced search feature that allows users to filter and sort results based on different criteria.',
    tagNames: [],
    tagFontColors: ['#ffffff', '#ffffff'],
    tagBackgroundColors: ['#27ae60', '#2ecc71'],
    columnName: 'In Progress',
    subtasks: [],
    createdAt: new Date('2023-04-28T09:00:00Z'),
    updatedAt: new Date('2023-04-30T09:30:00Z'),
  },
];
