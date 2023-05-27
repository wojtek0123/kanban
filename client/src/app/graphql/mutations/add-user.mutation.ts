import { TypedDocumentNode, gql } from 'apollo-angular';

export const ADD_USER: TypedDocumentNode<
  { addUser: { id: string; name: string; email: string } },
  { name: string; email: string; id: string }
> = gql`
  mutation addUser($name: String, $email: String, $id: String) {
    addUser(name: $name, email: $email, id: $id) {
      id
      name
      email
    }
  }
`;
