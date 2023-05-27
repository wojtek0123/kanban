import { TypedDocumentNode, gql } from 'apollo-angular';
import { Subtask } from 'src/app/models/subtask.model';

export const CHANGE_COMPLETION_STATE: TypedDocumentNode<
  { changeCompletionState: Partial<Subtask> },
  { id: string; state: boolean }
> = gql`
  mutation changeCompletionState($id: String, $state: Boolean) {
    changeCompletionState(id: $id, state: $state) {
      id
      name
      isFinished
    }
  }
`;
