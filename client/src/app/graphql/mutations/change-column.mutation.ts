import { gql } from 'apollo-angular';

export const CHANGE_COLUMN = gql`
  mutation changeColumn($columnId: String, $taskId: String) {
    changeColumn(columnId: $columnId, taskId: $taskId) {
      id
      name
      tasks {
        id
        title
        description
        tagNames
        tagFontColors
        tagBackgroundColors
        subtasks {
          id
          isFinished
          name
        }
      }
    }
  }
`;
