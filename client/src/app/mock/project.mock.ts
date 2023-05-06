import { Project } from '../models/project.model';

export const project1: Project = {
  id: 'p1',
  name: 'Project 1',
  users: ['user1', 'user2'],
  userId: 'user1',
  boards: [],
  createdAt: new Date('2022-01-01'),
  updatedAt: new Date('2022-01-05'),
};

export const project2: Project = {
  id: 'p2',
  name: 'Project 2',
  users: ['user1', 'user3', 'user4'],
  userId: 'user4',
  boards: [],
  createdAt: new Date('2022-02-10'),
  updatedAt: new Date('2022-02-12'),
};

export const project3: Project = {
  id: 'p3',
  name: 'Project 3',
  users: ['user2', 'user3'],
  userId: 'user2',
  boards: [],
  createdAt: new Date('2022-03-20'),
  updatedAt: new Date('2022-03-21'),
};
