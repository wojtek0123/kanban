import { Board } from 'src/app/models/board.model';
import { GetTasksPipe } from './get-tasks.pipe';
import { board } from 'src/app/mock/board.mock';
import { boardWithoutTasks } from 'src/app/mock/board.mock';

describe('GetTasksPipe', () => {
  let pipe: GetTasksPipe;

  beforeEach(() => {
    pipe = new GetTasksPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array when there is no tasks', () => {
    expect(pipe.transform(boardWithoutTasks)).toHaveSize(0);
  });

  it('should return 4 tasks', () => {
    const expectedTasks = board.columns.flatMap(
      columnWrapper => columnWrapper.column.tasks
    );

    const actualTasks = pipe.transform(board);

    expect(actualTasks).toHaveSize(4);

    actualTasks.forEach((task, index) => {
      expect(task).toEqual(expectedTasks[index]);
    });
  });
});
