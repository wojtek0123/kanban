import { gql } from 'apollo-angular';

export const ADD_PROJECT = gql`
  mutation addProject($name: String, $userId: String) {
    addProject(name: $name, userId: $userId) {
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
