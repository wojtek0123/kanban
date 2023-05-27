import { TypedDocumentNode, gql } from 'apollo-angular';
import { Task } from 'src/app/models/task.model';

export const GET_TASKS_FROM_USER: TypedDocumentNode<
  {
    getTasksFromUser: { task: Task }[];
  },
  { userId: string }
> = gql`
  query GetTasksFromUser($userId: String) {
    getTasksFromUser(userId: $userId) {
      task {
        id
        title
        description
        tagNames
        tagFontColors
        tagBackgroundColors
        createdAt
        updatedAt
        subtasks {
          id
          isFinished
          name
          createdAt
          updatedAt
        }
      }
    }
  }
`;
