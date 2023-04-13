import { CheckWhetherUserIsIncludedPipe } from './check-whether-user-is-included.pipe';

describe('CheckWheterUserIsIncludedPipe', () => {
  it('create an instance', () => {
    const pipe = new CheckWhetherUserIsIncludedPipe();
    expect(pipe).toBeTruthy();
  });
});
