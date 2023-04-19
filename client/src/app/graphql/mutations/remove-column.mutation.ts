import { gql } from 'apollo-angular';

export const REMOVE_COLUMN = gql`
  mutation removeColumn($id: String) {
    removeColumn(id: $id) {
      id
    }
  }
`;
