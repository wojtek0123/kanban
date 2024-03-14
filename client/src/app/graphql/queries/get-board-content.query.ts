import { TypedDocumentNode, gql } from 'apollo-angular';
import { Column } from 'src/app/models/column.model';

export interface BoardContent {
  columns: Column[];
}

export const GET_BOARD_CONTENT: TypedDocumentNode<{ board: BoardContent }, { userId: string; boardId: string }> = gql`
  query Board($boardId: String, $userId: String) {
    board(userId: $userId, id: $boardId) {
      columns {
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
          title
          updatedAt
          columnId
          tags {
            name
            id
            fontColor
            createdAt
            backgroundColor
            updatedAt
          }
          subtasks {
            id
            name
            isFinished
            createdAt
            updatedAt
          }
          user {
            name
            id
          }
        }
      }
    }
  }
`;
