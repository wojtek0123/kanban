import { gql } from 'apollo-angular';

export const REMOVE_USER_FROM_TASK = gql`
  mutation RemoveUserFromTask($taskId: String, $userId: String) {
    removeUserFromTask(taskId: $taskId, userId: $userId) {
      taskId
      userId
    }
  }
`;
