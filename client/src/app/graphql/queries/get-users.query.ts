import { gql } from 'apollo-angular';

export const GET_USERS = gql`
  query users {
    users {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;
