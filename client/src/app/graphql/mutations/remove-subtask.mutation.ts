import { TypedDocumentNode, gql } from 'apollo-angular';

export const REMOVE_SUBTASK: TypedDocumentNode<
  { removeSubtask: { id: string } },
  { id: string }
> = gql`
  mutation removeSubtask($id: String) {
    removeSubtask(id: $id) {
      id
    }
  }
`;
