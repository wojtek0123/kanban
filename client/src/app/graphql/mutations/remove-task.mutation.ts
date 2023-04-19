import { gql } from 'apollo-angular';

export const REMOVE_TASK = gql`
  mutation removeTask($id: String) {
    removeTask(id: $id) {
      id
    }
  }
`;
