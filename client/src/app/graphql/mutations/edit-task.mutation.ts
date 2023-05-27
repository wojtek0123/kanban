import { TypedDocumentNode, gql } from 'apollo-angular';

export const EDIT_TASK: TypedDocumentNode<
  { editTask: Partial<Task> },
  {
    id: string;
    title: string;
    description: string;
    tagNames: string;
    tagFontColors: string[];
    tagBackgroundColors: string[];
  }
> = gql`
  mutation editTask(
    $id: String
    $title: String
    $description: String
    $tagNames: [String]
    $tagFontColors: [String]
    $tagBackgroundColors: [String]
  ) {
    editTask(
      id: $id
      title: $title
      description: $description
      tagNames: $tagNames
      tagFontColors: $tagFontColors
      tagBackgroundColors: $tagBackgroundColors
    ) {
      id
      title
      description
      tagNames
      tagFontColors
      tagBackgroundColors
    }
  }
`;
