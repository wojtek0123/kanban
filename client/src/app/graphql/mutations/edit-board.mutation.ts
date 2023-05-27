import { TypedDocumentNode, gql } from 'apollo-angular';

export const EDIT_BOARD: TypedDocumentNode<
  { editBoard: { id: string; name: string } },
  { id: string; name: string }
> = gql`
  mutation editBoard($id: String, $name: String) {
    editBoard(id: $id, name: $name) {
      id
      name
    }
  }
`;
