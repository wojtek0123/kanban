import { User } from 'src/app/models/user.model';
import { userIncludedPipe } from './user-included.pipe';

describe('userIncludedPipe', () => {
  let pipe: userIncludedPipe;
  const users: { user: User }[] = [
    {
      user: {
        id: '1',
        name: 'john',
        email: 'john@email.com',
        createdAt: new Date(''),
        updateAt: new Date(''),
      },
    },
    {
      user: {
        id: '2',
        name: 'joe',
        email: 'joe@email.com',
        createdAt: new Date(''),
        updateAt: new Date(''),
      },
    },
    {
      user: {
        id: '3',
        name: 'bob',
        email: 'bob@email.com',
        createdAt: new Date(''),
        updateAt: new Date(''),
      },
    },
  ];

  beforeEach(() => {
    pipe = new userIncludedPipe();
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
