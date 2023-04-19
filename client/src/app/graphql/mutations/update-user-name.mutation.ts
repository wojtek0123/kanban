import { gql } from 'apollo-angular';

export const UPDATE_USER_NAME = gql`
  mutation updateUserName($id: String, $name: String) {
    updateUserName(id: $id, name: $name) {
      id
      name
    }
  }
`;
