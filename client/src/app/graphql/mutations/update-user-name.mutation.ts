import { TypedDocumentNode, gql } from 'apollo-angular';

export const UPDATE_USER_NAME: TypedDocumentNode<
  {
    updateUserName: {
      id: string;
      name: string;
    };
  },
  { id: string; name: string }
> = gql`
  mutation updateUserName($id: String, $name: String) {
    updateUserName(id: $id, name: $name) {
      id
      name
    }
  }
`;
