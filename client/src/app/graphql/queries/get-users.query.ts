import { TypedDocumentNode, gql } from 'apollo-angular';
import { User } from 'src/app/models/user.model';

export const GET_USERS: TypedDocumentNode<{ users: User[] }, {}> = gql`
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
