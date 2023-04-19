import { gql } from 'apollo-angular';

export const GET_USERS_FROM_TASK = gql`
  query UsersFromTask($taskId: String) {
    usersFromTask(taskId: $taskId) {
      user {
        name
        email
        id
      }
    }
  }
`;
