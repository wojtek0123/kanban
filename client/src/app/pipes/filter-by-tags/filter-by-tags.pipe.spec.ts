import { FilterByTagsPipe } from './filter-by-tags.pipe';
import { tasks } from 'src/app/mock/tasks.mock';

describe('FilterByTagsPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterByTagsPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return empty array when tasks is also an empty array', () => {
    const pipe = new FilterByTagsPipe();

    expect(pipe.transform([], [])).toHaveSize(0);
  });

  it('should return Task array which includes the "Content Creation" tag', () => {
    const pipe = new FilterByTagsPipe();

    expect(pipe.transform(tasks, ['Content Creation'])).toHaveSize(1);
  });

  it('should return one task without a tags when tags are empty string', () => {
    const pipe = new FilterByTagsPipe();

    expect(pipe.transform(tasks, [''])).toHaveSize(2);
    expect(pipe.transform(tasks, [''])).toContain(tasks[2]);
    expect(pipe.transform(tasks, [''])).toContain(tasks[3]);
  });

  it('should return empty array when tasks have length 0 but tags are not', () => {
    const pipe = new FilterByTagsPipe();

    expect(pipe.transform([], ['Tag'])).toHaveSize(0);
  });

  it('should return empty array when tag names is not included', () => {
    const pipe = new FilterByTagsPipe();

    expect(pipe.transform(tasks, ['Front-end'])).toHaveSize(0);
  });

  it('should return all tasks which includes the "Organize" tag name', () => {
    const pipe = new FilterByTagsPipe();

    expect(pipe.transform(tasks, ['Organize'])).toHaveSize(2);
  });
});
