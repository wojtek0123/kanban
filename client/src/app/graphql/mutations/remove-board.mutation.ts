import { gql } from 'apollo-angular';

export const REMOVE_BOARD = gql`
  mutation removeBoard($id: String) {
    removeBoard(id: $id) {
      id
    }
  }
`;
