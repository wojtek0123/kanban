import { gql } from 'apollo-angular';

export const GET_USERS_FROM_PROJECT = gql`
  query UsersFromProject($projectId: String) {
    usersFromProject(projectId: $projectId) {
      user {
        email
        id
        name
      }
    }
  }
`;
