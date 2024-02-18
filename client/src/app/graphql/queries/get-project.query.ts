import { gql, TypedDocumentNode } from 'apollo-angular';
import { Board } from '../../models/board.model';

export interface Project {
  id: string;
  name: string;
  users: string[];
  userId: string;
  boards: Board[];
  createdAt: Date;
  updatedAt: Date;
}

export const GET_PROJECT: TypedDocumentNode<
  { project: Project },
  { projectId: string; userId: string; boardId: string }
> = gql`
  query Project($userId: String, $projectId: String, $boardId: String) {
    project(userId: $userId, projectId: $projectId, boardId: $boardId) {
      id
      name
      userId
      boards {
        id
        name
        columns {
          id
          name
          order
          dotColor
          tasks {
            id
            description
            createdAt
            tagBackgroundColors
            tagFontColors
            tagNames
            title
            updatedAt
            subtasks {
              id
              isFinished
              name
            }
          }
        }
      }
    }
  }
`;
