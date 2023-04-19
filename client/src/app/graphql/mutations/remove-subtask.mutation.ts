import { gql } from 'apollo-angular';

export const REMOVE_SUBTASK = gql`
  mutation removeSubtask($id: String) {
    removeSubtask(id: $id) {
      id
    }
  }
`;
