import { gql } from 'apollo-angular';

export const CHANGE_COMPLETION_STATE = gql`
  mutation changeCompletionState($id: String, $state: Boolean) {
    changeCompletionState(id: $id, state: $state) {
      id
      name
      isFinished
    }
  }
`;
