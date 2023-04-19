import { gql } from 'apollo-angular';

export const ADD_USER_TO_PROJECT = gql`
  mutation AddUserToProject($projectId: String, $userId: String) {
    addUserToProject(projectId: $projectId, userId: $userId) {
      user {
        email
        id
        name
      }
      project {
        id
        name
      }
    }
  }
`;
