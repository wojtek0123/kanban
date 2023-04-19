import { gql } from 'apollo-angular';

export const CHANGE_COLUMN_WRAPPER = gql`
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
