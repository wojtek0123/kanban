import { gql } from 'apollo-angular';

export const EDIT_COLUMN = gql`
  mutation editColumn($id: String, $name: String, $dotColor: String) {
    editColumn(id: $id, name: $name, dotColor: $dotColor) {
      id
      name
    }
  }
`;
