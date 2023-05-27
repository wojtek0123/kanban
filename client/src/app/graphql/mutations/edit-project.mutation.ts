import { TypedDocumentNode, gql } from 'apollo-angular';
import { Project } from 'src/app/models/project.model';

export const EDIT_PROJECT: TypedDocumentNode<
  { editProject: Partial<Project> },
  { id: string; name: string }
> = gql`
  mutation editProject($id: String, $name: String) {
    editProject(id: $id, name: $name) {
      id
      name
    }
  }
`;
