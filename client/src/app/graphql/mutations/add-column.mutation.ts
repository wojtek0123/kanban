import { gql } from 'apollo-angular';

export const ADD_COLUMN = gql`
  mutation addColumn($boardId: String, $name: String, $dotColor: String) {
    addColumn(boardId: $boardId, name: $name, dotColor: $dotColor) {
      id
    }
  }
`;
