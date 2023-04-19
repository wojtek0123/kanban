import { gql } from 'apollo-angular';

export const EDIT_PROJECT = gql`
  mutation editProject($id: String, $name: String) {
    editProject(id: $id, name: $name) {
      id
      name
    }
  }
`;
