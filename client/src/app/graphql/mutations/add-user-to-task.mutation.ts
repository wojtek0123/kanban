import { gql } from 'apollo-angular';

export const ADD_USER_TO_TASK = gql`
  mutation AddUserToTask($userId: String, $taskId: String) {
    addUserToTask(userId: $userId, taskId: $taskId) {
      createdAt
      userId
      taskId
      updatedAt
    }
  }
`;
