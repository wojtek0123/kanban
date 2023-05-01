import { SortPipe } from './sort.pipe';
import { Task } from 'src/app/models/task.model';
import { tasks } from 'src/app/mock/tasks.mock';

describe('SortPipe', () => {
  let pipe: SortPipe;

  beforeEach(() => {
    pipe = new SortPipe();
  });

  it('create an instance', () => {
    const pipe = new SortPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return ascending sorted tasks by title', () => {
    const sortedTasks = pipe.transform(tasks, 'asc', 'title');

    expect(sortedTasks[0]).toEqual(tasks[0]);
    expect(sortedTasks[1]).toEqual(tasks[3]);
    expect(sortedTasks[2]).toEqual(tasks[2]);
    expect(sortedTasks[3]).toEqual(tasks[1]);
  });

  it('should return descending sorted tasks by title', () => {
    const sortedTasks = pipe.transform(tasks, 'des', 'title');

    expect(sortedTasks[0]).toEqual(tasks[1]);
    expect(sortedTasks[1]).toEqual(tasks[2]);
    expect(sortedTasks[2]).toEqual(tasks[3]);
    expect(sortedTasks[3]).toEqual(tasks[0]);
  });

  it('should return ascending sorted tasks by createdAt', () => {
    const sortedTasks = pipe.transform(tasks, 'asc', 'createdAt');

    expect(sortedTasks[0]).toEqual(tasks[2]);
    expect(sortedTasks[1]).toEqual(tasks[3]);
    expect(sortedTasks[2]).toEqual(tasks[1]);
    expect(sortedTasks[3]).toEqual(tasks[0]);
  });

  it('should return descending sorted tasks by createdAt', () => {
    const sortedTasks = pipe.transform(tasks, 'des', 'createdAt');

    expect(sortedTasks[0]).toEqual(tasks[0]);
    expect(sortedTasks[1]).toEqual(tasks[1]);
    expect(sortedTasks[2]).toEqual(tasks[2]);
    expect(sortedTasks[3]).toEqual(tasks[3]);
  });

  it('should return ascending sorted tasks by updatedAt', () => {
    const sortedTasks = pipe.transform(tasks, 'asc', 'updatedAt');

    expect(sortedTasks[0]).toEqual(tasks[2]);
    expect(sortedTasks[1]).toEqual(tasks[3]);
    expect(sortedTasks[2]).toEqual(tasks[1]);
    expect(sortedTasks[3]).toEqual(tasks[0]);
  });

  it('should return descending sorted tasks by updatedAt', () => {
    const sortedTasks = pipe.transform(tasks, 'des', 'updatedAt');

    expect(sortedTasks[0]).toEqual(tasks[0]);
    expect(sortedTasks[1]).toEqual(tasks[1]);
    expect(sortedTasks[2]).toEqual(tasks[2]);
    expect(sortedTasks[3]).toEqual(tasks[3]);
  });

  it('should return empty array', () => {
    expect(pipe.transform([], 'asc', 'title')).toHaveSize(0);
  });

  it('should not sort an array when the column is not createdAt, updatedAt or title', () => {
    const columns: Array<keyof Task> = [
      'description',
      'subtasks',
      'tagBackgroundColors',
      'tagFontColors',
      'tagNames',
      'columnName',
      'id',
    ];

    columns.forEach(column => {
      expect(pipe.transform(tasks, 'asc', column)).toEqual(tasks);
    });
  });

  it('should return sorted array when the length of array is 1', () => {
    const tasks = [
      {
        id: 'task4',
        title: 'Clean apartment',
        description: 'Clean the apartment before guests arrive',
        tagNames: ['cleaning'],
        tagFontColors: ['#ffffff'],
        tagBackgroundColors: ['#f1c40f'],
        subtasks: [],
        createdAt: new Date('2023-04-27T14:00:00.000Z'),
        updatedAt: new Date('2023-04-30T11:00:00.000Z'),
      },
    ];

    const columns: Array<keyof Task> = ['title', 'updatedAt', 'createdAt'];
    columns.forEach(column => {
      expect(pipe.transform(tasks, 'asc', column)).toEqual(tasks);
    });
  });
});
