import { GetColumnIdsPipe } from './get-column-ids.pipe';

describe('GetColumnIdsPipe', () => {
  let pipe: GetColumnIdsPipe;

  beforeEach(() => {
    pipe = new GetColumnIdsPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
