import { gql } from 'apollo-angular';

export const ADD_USER = gql`
  mutation addUser($name: String, $email: String, $id: String) {
    addUser(name: $name, email: $email, id: $id) {
      id
      name
      email
    }
  }
`;
