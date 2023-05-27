import { TypedDocumentNode, gql } from 'apollo-angular';
import { Project } from 'src/app/models/project.model';

export const REMOVE_USER_FROM_PROJECT: TypedDocumentNode<
  { removeUserFromProject: { project: Partial<Project> } },
  { projectId: string; userId: string }
> = gql`
  mutation RemoveUserFromProject($projectId: String, $userId: String) {
    removeUserFromProject(projectId: $projectId, userId: $userId) {
      project {
        id
        name
      }
    }
  }
`;
