import { TypedDocumentNode, gql } from 'apollo-angular';
import { User } from 'src/app/models/user.model';

export const GET_FILTERED_USERS: TypedDocumentNode<
  { filteredUsers: User[] },
  { text: string }
> = gql`
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
