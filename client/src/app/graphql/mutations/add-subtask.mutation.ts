import { TypedDocumentNode, gql } from 'apollo-angular';
import { Subtask } from 'src/app/models/subtask.model';

export const ADD_SUBTASK: TypedDocumentNode<
  { addSubtask: Partial<Subtask> },
  { name: string; isFinished: boolean; taskId: string }
> = gql`
  mutation addSubtask($name: String, $isFinished: Boolean, $taskId: String) {
    addSubtask(name: $name, isFinished: $isFinished, taskId: $taskId) {
      id
      name
      isFinished
    }
  }
`;
