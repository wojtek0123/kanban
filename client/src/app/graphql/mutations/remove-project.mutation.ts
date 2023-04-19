import { gql } from 'apollo-angular';

export const REMOVE_PROJECT = gql`
  mutation removeProject($id: String) {
    removeProject(id: $id) {
      id
    }
  }
`;
