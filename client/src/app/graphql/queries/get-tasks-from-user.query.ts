import { gql } from 'apollo-angular';

export const GET_TASKS_FROM_USER = gql`
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
