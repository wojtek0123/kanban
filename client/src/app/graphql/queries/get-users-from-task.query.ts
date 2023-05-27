import { TypedDocumentNode, gql } from 'apollo-angular';
import { User } from 'src/app/models/user.model';

export const GET_USERS_FROM_TASK: TypedDocumentNode<
  { usersFromTask: { user: User }[] },
  { taskId: string }
> = gql`
  query UsersFromTask($taskId: String) {
    usersFromTask(taskId: $taskId) {
      user {
        name
        email
        id
        createdAt
        updatedAt
      }
    }
  }
`;
