import { TypedDocumentNode, gql } from 'apollo-angular';
import { Column } from 'src/app/models/column.model';

export const CHANGE_COLUMN_ORDER: TypedDocumentNode<
  { changeColumnOrder: Partial<Column> },
  {
    currOrder: number;
    prevOrder: number;
    currColumnId: string;
    prevColumnId: string;
  }
> = gql`
  mutation ChangeColumnOrder(
    $currOrder: Int
    $prevOrder: Int
    $currColumnId: String
    $prevColumnId: String
  ) {
    changeColumnOrder(
      currOrder: $currOrder
      prevOrder: $prevOrder
      currColumnId: $currColumnId
      prevColumnId: $prevColumnId
    ) {
      id
    }
  }
`;
