import { gql } from 'apollo-angular';

export const REMOVE_COLUMN_WRAPPER = gql`
  mutation removeColumnWrapper($id: String) {
    removeColumnWrapper(id: $id) {
      id
    }
  }
`;
