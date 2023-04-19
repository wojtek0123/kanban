import { gql } from 'apollo-angular';

export const ADD_BOARD = gql`
  mutation addBoard($name: String, $projectId: String) {
    addBoard(name: $name, projectId: $projectId) {
      id
      name
      createdAt
      updatedAt
      columns {
        id
        columnId
        column {
          id
          name
          dotColor
          columnWrapperId
          createdAt
          updatedAt
          tasks {
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
    }
  }
`;
