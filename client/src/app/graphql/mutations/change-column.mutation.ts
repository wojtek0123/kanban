import { TypedDocumentNode, gql } from 'apollo-angular';
import { Column } from 'src/app/models/column.model';
import { Task } from 'src/app/models/task.model';

export const CHANGE_COLUMN: TypedDocumentNode<
  { changeColumn: Task },
  { columnId: string; taskId: string }
> = gql`
  mutation changeColumn($columnId: String, $taskId: String) {
    changeColumn(columnId: $columnId, taskId: $taskId) {
      id
      title
      description
      tagNames
      tagFontColors
      columnId
      tagBackgroundColors
      subtasks {
        id
        isFinished
        name
      }
    }
  }
`;
