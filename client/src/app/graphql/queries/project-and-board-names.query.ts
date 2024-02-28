import { gql, TypedDocumentNode } from 'apollo-angular';

export interface ProjectAndBoardNames {
  id: string;
  name: string;
  boards: {
    id: string;
    name: string;
  }[];
}

export const GET_PROJECT_AND_BOARD_NAMES: TypedDocumentNode<
  { projects: ProjectAndBoardNames[] },
  { userId: string }
> = gql`
  query ProjectAndBoardNames($userId: String) {
    projects(userId: $userId) {
      id
      name
      userId
      boards {
        name
        id
      }
    }
  }
`;
