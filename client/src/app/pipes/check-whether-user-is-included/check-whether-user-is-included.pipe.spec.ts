import { CheckWhetherUserIsIncludedPipe } from './check-whether-user-is-included.pipe';

describe('CheckWhetherUserIsIncludedPipe', () => {
  let pipe: CheckWhetherUserIsIncludedPipe;
  const users = [
    { user: { id: '1', name: 'john', email: 'john@email.com' } },
    { user: { id: '2', name: 'joe', email: 'joe@email.com' } },
    { user: { id: '3', name: 'bob', email: 'bob@email.com' } },
  ];

  beforeEach(() => {
    pipe = new CheckWhetherUserIsIncludedPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true when userId is included in users', () => {
    expect(pipe.transform(users, '1')).toBeTrue();
  });

  it('should return false when userId is not included in users', () => {
    expect(pipe.transform(users, '0')).toBeFalse();
  });

  it('should return false when users length is 0', () => {
    expect(pipe.transform([], '')).toBeFalse();
  });
});
