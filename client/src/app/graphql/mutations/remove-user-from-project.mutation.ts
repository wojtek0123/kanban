import { gql } from 'apollo-angular';

export const REMOVE_USER_FROM_PROJECT = gql`
  mutation RemoveUserFromProject($projectId: String, $userId: String) {
    removeUserFromProject(projectId: $projectId, userId: $userId) {
      project {
        id
        name
      }
    }
  }
`;
