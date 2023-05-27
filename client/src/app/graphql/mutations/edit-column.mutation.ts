import { TypedDocumentNode, gql } from 'apollo-angular';

export const EDIT_COLUMN: TypedDocumentNode<
  { editColumn: { id: string; name: string } },
  { id: string; name: string; dotColor: string }
> = gql`
  mutation editColumn($id: String, $name: String, $dotColor: String) {
    editColumn(id: $id, name: $name, dotColor: $dotColor) {
      id
      name
    }
  }
`;
