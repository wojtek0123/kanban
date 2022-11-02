import { gql } from 'apollo-angular';

export const GET_BOARDS = gql`
  query boards {
    boards {
      id
      name
      columns {
        id
        name
        tasks {
          id
          title
          description
        }
      }
    }
  }
`;

export const ADD_BOARD = gql`
  mutation addBoard($name: String) {
    addBoard(name: $name) {
      id
      name
    }
  }
`;
export const ADD_COLUMN = gql`
  mutation addColumn($boardId: String, $name: String) {
    addColumn(boardId: $boardId, name: $name) {
      id
    }
  }
`;
export const ADD_TASK = gql`
  mutation addTask($columnId: String, $title: String, $description: String) {
    addTask(columnId: $columnId, title: $title, description: $description) {
      id
    }
  }
`;

export const EDIT_BOARD = gql`
  mutation editBoard($id: String, $name: String) {
    editBoard(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const EDIT_COLUMN = gql`
  mutation editColumn($id: String, $name: String) {
    editColumn(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const EDIT_TASK = gql`
  mutation editTask($id: String, $title: String, $description: String) {
    editTask(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;
