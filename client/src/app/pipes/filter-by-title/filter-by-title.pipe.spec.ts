import { FilterByTitlePipe } from './filter-by-title.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterByTitlePipe();
    expect(pipe).toBeTruthy();
  });
});
