import { TypedDocumentNode, gql } from 'apollo-angular';

export const REMOVE_BOARD: TypedDocumentNode<
  { removeBoard: { id: string } },
  { id: string }
> = gql`
  mutation removeBoard($id: String) {
    removeBoard(id: $id) {
      id
    }
  }
`;
