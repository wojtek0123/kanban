import { TypedDocumentNode, gql } from 'apollo-angular';
import { Board } from 'src/app/models/board.model';

export const ADD_BOARD: TypedDocumentNode<
  { addBoard: Board },
  { name: string; projectId: string }
> = gql`
  mutation addBoard($name: String, $projectId: String) {
    addBoard(name: $name, projectId: $projectId) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
