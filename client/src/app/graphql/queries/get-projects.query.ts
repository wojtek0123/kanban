import { TypedDocumentNode, gql } from 'apollo-angular';

export interface Project {
  id: string;
  name: string;
  userId: string;
  boards: {
    id: string;
    name: string;
    columns: {
      id: string;
      tasks: {
        id: string;
        subtasks: {
          id: string;
        };
      };
    };
  };
}

export const GET_PROJECTS: TypedDocumentNode<
  { projects: Project[] },
  { userId: string }
> = gql`
  query projects($userId: String) {
    projects(userId: $userId) {
      id
      name
      userId
      boards {
        id
        name
        columns {
          id
          tasks {
            id
            subtasks {
              id
            }
          }
        }
      }
    }
  }
`;
