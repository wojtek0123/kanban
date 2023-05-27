import { TypedDocumentNode, gql } from 'apollo-angular';

export const REMOVE_COLUMN: TypedDocumentNode<
  { removeColumn: { id: string } },
  { id: string }
> = gql`
  mutation removeColumn($id: String) {
    removeColumn(id: $id) {
      id
    }
  }
`;
