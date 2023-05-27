import { TypedDocumentNode, gql } from 'apollo-angular';
import { Subtask } from 'src/app/models/subtask.model';

export const EDIT_SUBTASK: TypedDocumentNode<
  { editSubtask: Subtask },
  { id: string; name: string }
> = gql`
  mutation editSubtask($id: String, $name: String) {
    editSubtask(id: $id, name: $name) {
      id
      name
      isFinished
      createdAt
      updatedAt
    }
  }
`;
