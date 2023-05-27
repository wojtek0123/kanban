import { TypedDocumentNode, gql } from 'apollo-angular';

export const ADD_COLUMN: TypedDocumentNode<
  { addColumn: { id: string } },
  { boardId: string; name: string; dotColor: string }
> = gql`
  mutation addColumn($boardId: String, $name: String, $dotColor: String) {
    addColumn(boardId: $boardId, name: $name, dotColor: $dotColor) {
      id
    }
  }
`;
