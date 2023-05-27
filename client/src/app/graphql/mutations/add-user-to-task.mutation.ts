import { TypedDocumentNode, gql } from 'apollo-angular';

export const ADD_USER_TO_TASK: TypedDocumentNode<
  {
    addUserToTask: {
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      taskId: string;
    };
  },
  { userId: string; taskId: string }
> = gql`
  mutation AddUserToTask($userId: String, $taskId: String) {
    addUserToTask(userId: $userId, taskId: $taskId) {
      createdAt
      userId
      taskId
      updatedAt
    }
  }
`;
