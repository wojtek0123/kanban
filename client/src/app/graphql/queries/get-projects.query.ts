import { TypedDocumentNode, gql } from 'apollo-angular';
import { Project } from 'src/app/models/project.model';

export const GET_PROJECTS: TypedDocumentNode<
  { projects: Project[] },
  { userId: string }
> = gql`
  query projects($userId: String) {
    projects(userId: $userId) {
      id
      name
      updatedAt
      userId
      createdAt
      boards {
        createdAt
        id
        name
        updatedAt
        columns {
          boardId
          createdAt
          dotColor
          id
          name
          order
          updatedAt
          tasks {
            createdAt
            description
            id
            tagBackgroundColors
            tagFontColors
            tagNames
            title
            updatedAt
            subtasks {
              createdAt
              id
              isFinished
              name
              updatedAt
            }
          }
        }
      }
    }
  }
`;
