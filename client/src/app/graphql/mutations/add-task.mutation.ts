import { gql } from 'apollo-angular';

export const ADD_TASK = gql`
  mutation AddTask(
    $columnId: String
    $title: String
    $description: String
    $tagNames: [String]
    $tagFontColors: [String]
    $tagBackgroundColors: [String]
  ) {
    addTask(
      columnId: $columnId
      title: $title
      description: $description
      tagNames: $tagNames
      tagFontColors: $tagFontColors
      tagBackgroundColors: $tagBackgroundColors
    ) {
      id
    }
  }
`;
