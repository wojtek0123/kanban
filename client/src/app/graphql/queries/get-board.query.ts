import { gql, TypedDocumentNode } from 'apollo-angular';
import { Board } from '../../models/board.model';

export const GET_BOARD: TypedDocumentNode<{ board: Board }, { userId: string; boardId: string }> = gql`
  query Board($boardId: String, $userId: String) {
    board(id: $boardId, userId: $userId) {
      id
      name
      updatedAt
      createdAt
      columns {
        name
        order
        updatedAt
        dotColor
        createdAt
        id
        tasks {
          createdAt
          description
          id
          title
          updatedAt
          subtasks {
            id
            createdAt
            isFinished
            name
            updatedAt
          }
          tags {
            backgroundColor
            id
            name
            updatedAt
            fontColor
            createdAt
          }
        }
      }
    }
  }
`;
