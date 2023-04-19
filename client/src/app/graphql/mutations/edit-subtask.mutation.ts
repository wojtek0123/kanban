import { gql } from 'apollo-angular';

export const EDIT_SUBTASK = gql`
  mutation editSubtask($id: String, $name: String) {
    editSubtask(id: $id, name: $name) {
      id
      name
      isFinished
    }
  }
`;
