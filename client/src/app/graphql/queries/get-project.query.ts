import { gql, TypedDocumentNode } from 'apollo-angular';

export interface Project {}

export const GET_PROJECT: TypedDocumentNode<
  {},
  { id: string; userId: string }
> = gql`
query project($id: String, $userId: String) {
  project(id: $id, userId: $userId) {
    id
    name
    userId
    createdAt
    updatedAt
    boards {

    }
  }
}
`;
