import { gql } from 'apollo-angular';

export const GET_PROJECTS = gql`
  query projects($userId: String) {
    projects(userId: $userId) {
      id
      name
      userId
      createdAt
      updatedAt
      boards {
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
  }
`;
