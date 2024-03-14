import { TypedDocumentNode, gql } from 'apollo-angular';
import { Column } from 'src/app/models/column.model';

export const CHANGE_COLUMN_ORDER: TypedDocumentNode<
  { changeColumnOrder: Column[] },
  {
    columnIds: string[];
    orders: number[];
  }
> = gql`
  mutation ChangeColumnOrder($columnIds: [String], $orders: [Int]) {
    changeColumnOrder(columnIds: $columnIds, orders: $orders) {
      createdAt
      dotColor
      id
      name
      order
      updatedAt
      tasks {
        createdAt
        description
        id
        title
        updatedAt
        columnId
        tags {
          name
          id
          fontColor
          createdAt
          backgroundColor
          updatedAt
        }
        subtasks {
          id
          name
          isFinished
          createdAt
          updatedAt
        }
        user {
          name
          id
        }
      }
    }
  }
`;
