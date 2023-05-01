import { ShowElementPipe } from './show-element.pipe';

describe('ShowElementPipe', () => {
  let pipe: ShowElementPipe;

  beforeEach(() => {
    pipe = new ShowElementPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true when isOwner is false and isProtected is false', () => {
    expect(pipe.transform(false, false)).toBeTrue();
  });

  it('should return false when isOwner is false and isProtected is true', () => {
    expect(pipe.transform(false, true)).toBeFalse();
  });

  it('should return true when isOwner is true and isProtected is false', () => {
    expect(pipe.transform(true, false)).toBeTrue();
  });

  it('should return true when isOwner is true and isProtected is true', () => {
    expect(pipe.transform(true, true)).toBeTrue();
  });
});
