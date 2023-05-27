import { TypedDocumentNode, gql } from 'apollo-angular';

export const REMOVE_COLUMN_WRAPPER: TypedDocumentNode<
  { removeColumnWrapper: { id: string } },
  { id: string }
> = gql`
  mutation removeColumnWrapper($id: String) {
    removeColumnWrapper(id: $id) {
      id
    }
  }
`;
