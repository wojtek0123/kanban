import { GetColumnsWithoutOneSpecificPipe } from './get-columns-without-one-specific.pipe';
import { Column } from 'src/app/models/column.model';
import { board } from 'src/app/mock/board.mock';

describe('GetColumnsWithoutOneSpecificPipe', () => {
  let pipe: GetColumnsWithoutOneSpecificPipe;

  beforeEach(() => {
    pipe = new GetColumnsWithoutOneSpecificPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array when length of columns is equal 0', () => {
    expect(pipe.transform([], '')).toHaveSize(0);
  });

  it('should return 3 columns when columnId is equal empty string', () => {
    expect(pipe.transform(board.columns, '')).toHaveSize(3);
  });

  it('should return 2 columns when columns id is "9012', () => {
    const columns = pipe.transform(board.columns, '9012');

    const filteredOutColumn = board.columns
      .filter(column => column.id === '9012')
      .at(0) as Column;

    expect(columns).toHaveSize(2);
    expect(columns).not.toContain(filteredOutColumn);
  });

  it('should return 3 columns when columnId does not match', () => {
    expect(pipe.transform(board.columns, '-1')).toHaveSize(3);
  });
});
