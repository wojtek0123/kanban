import { TypedDocumentNode, gql } from 'apollo-angular';

export const GET_USERS_AND_TASKS: TypedDocumentNode<{ getUsersAndTasks: { taskId: string; userId: string }[] }> = gql`
  query GetUsersAndTasks {
    getUsersAndTasks {
      taskId
      userId
    }
  }
`;
