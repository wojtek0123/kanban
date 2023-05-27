import { TypedDocumentNode, gql } from 'apollo-angular';

export const REMOVE_PROJECT: TypedDocumentNode<
  { removeProject: { id: string } },
  { id: string }
> = gql`
  mutation removeProject($id: String) {
    removeProject(id: $id) {
      id
    }
  }
`;
