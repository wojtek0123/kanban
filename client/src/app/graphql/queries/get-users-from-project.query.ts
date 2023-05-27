import { TypedDocumentNode, gql } from 'apollo-angular';
import { User } from 'src/app/models/user.model';

export const GET_USERS_FROM_PROJECT: TypedDocumentNode<
  { usersFromProject: { user: User }[] },
  { projectId: string }
> = gql`
  query UsersFromProject($projectId: String) {
    usersFromProject(projectId: $projectId) {
      user {
        email
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;
