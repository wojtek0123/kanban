import { GetSubtasksPipe } from './get-subtasks.pipe';
import { board, boardWithoutTasks } from 'src/app/mock/board.mock';

describe('GetSubtasksPipe', () => {
  let pipe: GetSubtasksPipe;

  beforeEach(() => {
    pipe = new GetSubtasksPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array when there is no subtasks', () => {
    expect(pipe.transform(boardWithoutTasks)).toHaveSize(0);
  });

  it('should return 7 subtasks', () => {
    const actualSubtasks = pipe.transform(board);
    const expectedSubtasks = board.columns.flatMap(colWrapper =>
      colWrapper.column.tasks.flatMap(task => task.subtasks)
    );

    actualSubtasks.forEach((subtask, index) => {
      expect(subtask).toEqual(expectedSubtasks[index]);
    });

    expect(actualSubtasks).toHaveSize(7);
  });
});
