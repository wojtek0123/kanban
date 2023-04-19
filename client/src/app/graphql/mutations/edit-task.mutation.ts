import { gql } from 'apollo-angular';

export const EDIT_TASK = gql`
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
