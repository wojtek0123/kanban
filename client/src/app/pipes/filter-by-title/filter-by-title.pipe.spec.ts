import { FilterByTitlePipe } from './filter-by-title.pipe';
import { tasks } from 'src/app/mock/tasks.mock';

describe('FilterPipe', () => {
  let pipe: FilterByTitlePipe;

  beforeEach(() => {
    pipe = new FilterByTitlePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array', () => {
    expect(pipe.transform(tasks, '')).toHaveSize(4);
  });

  it('should return all tasks with title which includes "develop"', () => {
    expect(pipe.transform(tasks, 'develop')).toHaveSize(2);
    expect(pipe.transform(tasks, 'Develop')).toHaveSize(2);
  });

  it('should return empty array', () => {
    expect(pipe.transform([], '')).toHaveSize(0);
  });
});
