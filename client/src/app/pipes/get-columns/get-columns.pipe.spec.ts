import { GetColumnsPipe } from './get-columns.pipe';
import { board, boardWithoutColumns } from 'src/app/mock/board.mock';

describe('GetColumnsPipe', () => {
  let pipe: GetColumnsPipe;

  beforeEach(() => {
    pipe = new GetColumnsPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array when board is null or undefined', () => {
    expect(pipe.transform(undefined)).toHaveSize(0);
    expect(pipe.transform(null)).toHaveSize(0);
  });

  it('should return 3 columns', () => {
    const actualColumns = pipe.transform(board);
    const expectedColumns = board.columns;

    actualColumns.forEach((column, index) => {
      expect(column).toEqual(expectedColumns[index]);
    });

    expect(actualColumns).toHaveSize(3);
  });

  it('should return empty array when the board does not have columns', () => {
    expect(pipe.transform(boardWithoutColumns)).toHaveSize(0);
  });
});
