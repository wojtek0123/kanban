import { gql } from 'apollo-angular';

export const GET_FILTERED_USERS = gql`
  query filteredUsers($text: String) {
    filteredUsers(text: $text) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;
