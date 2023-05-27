import { TypedDocumentNode, gql } from 'apollo-angular';
import { ColumnWrapper } from 'src/app/models/columnWrapper.model';

export const CHANGE_COLUMN_WRAPPER: TypedDocumentNode<
  { changeColumnWrapper: Partial<ColumnWrapper> },
  {
    currColumnWrapperId: string;
    prevColumnWrapperId: string;
    currColumnId: string;
    prevColumnId: string;
    boardId: string;
  }
> = gql`
  mutation ChangeColumnWrapper(
    $currColumnWrapperId: String
    $prevColumnWrapperId: String
    $currColumnId: String
    $prevColumnId: String
    $boardId: String
  ) {
    changeColumnWrapper(
      currColumnWrapperId: $currColumnWrapperId
      prevColumnWrapperId: $prevColumnWrapperId
      currColumnId: $currColumnId
      prevColumnId: $prevColumnId
      boardId: $boardId
    ) {
      id
    }
  }
`;
