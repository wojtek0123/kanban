import {
  board,
  boardWithoutColumns,
  boardWithoutTasks,
} from 'src/app/mock/board.mock';
import { GetTagsFromTasksPipe } from './get-tags-from-tasks.pipe';

describe('GetTagsFromTasksPipe', () => {
  let pipe: GetTagsFromTasksPipe;

  beforeEach(() => {
    pipe = new GetTagsFromTasksPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string when there is no tasks or columns', () => {
    expect(pipe.transform(boardWithoutTasks)).toHaveSize(0);
    expect(pipe.transform(boardWithoutColumns)).toHaveSize(0);
  });

  it('should return 10 tags with unique names', () => {
    const tags = pipe.transform(board);
    const tagNames = new Set([...tags.map(tag => tag.name)]);

    expect(tags).toHaveSize(10);
    expect(tags).toHaveSize(tagNames.size);
  });
});
