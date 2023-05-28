import { gql } from 'apollo-angular';

export const ADD_PROJECT = gql`
  mutation addProject($name: String, $userId: String) {
    addProject(name: $name, userId: $userId) {
      id
      name
      userId
      createdAt
      updatedAt
      boards {
        id
        name
      }
    }
  }
`;
