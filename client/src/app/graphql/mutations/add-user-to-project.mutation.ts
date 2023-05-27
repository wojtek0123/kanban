import { TypedDocumentNode, gql } from 'apollo-angular';

export const ADD_USER_TO_PROJECT: TypedDocumentNode<
  {
    addUserToProject: {
      user: { email: string; id: string; name: string };
      project: { id: string; name: string };
    };
  },
  { projectId: string; userId: string }
> = gql`
  mutation AddUserToProject($projectId: String, $userId: String) {
    addUserToProject(projectId: $projectId, userId: $userId) {
      user {
        email
        id
        name
      }
      project {
        id
        name
      }
    }
  }
`;
