import { gql, TypedDocumentNode } from 'apollo-angular';

export interface BoardNameAndTags {
  id: string;
  name: string;
  columns: {
    tasks: {
      tags: TagBase[];
    }[];
  }[];
}

export interface TagBase {
  id: string;
  name: string;
}

export const GET_BOARD_NAME_AND_TAGS: TypedDocumentNode<
  { board: BoardNameAndTags },
  { userId: string; boardId: string }
> = gql`
  query Board($boardId: String, $userId: String) {
    board(id: $boardId, userId: $userId) {
      id
      name
      columns {
        tasks {
          tags {
            id
            name
          }
        }
      }
    }
  }
`;
