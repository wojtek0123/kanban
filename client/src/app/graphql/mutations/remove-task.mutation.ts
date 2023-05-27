import { TypedDocumentNode, gql } from 'apollo-angular';

export const REMOVE_TASK: TypedDocumentNode<
  { removeTask: { id: string } },
  { id: string }
> = gql`
  mutation removeTask($id: String) {
    removeTask(id: $id) {
      id
    }
  }
`;
