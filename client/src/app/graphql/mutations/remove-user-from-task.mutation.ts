import { TypedDocumentNode, gql } from 'apollo-angular';

export const REMOVE_USER_FROM_TASK: TypedDocumentNode<
  { removeUserFromTask: { taskId: string; userId: string } },
  { taskId: string; userId: string }
> = gql`
  mutation RemoveUserFromTask($taskId: String, $userId: String) {
    removeUserFromTask(taskId: $taskId, userId: $userId) {
      taskId
      userId
    }
  }
`;
