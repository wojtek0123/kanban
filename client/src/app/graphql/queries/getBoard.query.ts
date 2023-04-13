import { gql } from 'apollo-angular';

export const GET_BOARD = gql`
  query board($id: String) {
    board(id: $id) {
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
      Project {
        userId
      }
    }
  }
`;
