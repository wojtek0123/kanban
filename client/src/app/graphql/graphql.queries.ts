import { gql } from 'apollo-angular';

export const GET_BOARDS = gql`
  query Boards {
    Boards {
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
  mutation AddBoard($name: String) {
    AddBoard(name: $name) {
      id
    }
  }
`;
export const ADD_COLUMN = gql`
  mutation AddColumn($boardId: String, $name: String) {
    AddColumn(boardId: $boardId, name: $name) {
      id
    }
  }
`;
export const ADD_TASK = gql`
  mutation AddTask($columnId: String, $title: String, $description: String) {
    AddTask(columnId: $columnId, name: $name, description: $description) {
      id
    }
  }
`;

export const EDIT_BOARD = gql`
  mutation EditBoard($id: String, $name: String) {
    EditBoard(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const EDIT_COLUMN = gql`
  mutation EditColumn($id: String, $name: String) {
    EditColumn(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const EDIT_TASK = gql`
  mutation EditTask($id: String, $title: String, $description: String) {
    EditTask(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;
