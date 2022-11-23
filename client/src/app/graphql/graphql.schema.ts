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
          tags
          subtasks {
            id
            isFinished
            name
          }
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
  mutation addTask(
    $columnId: String
    $title: String
    $description: String
    $tags: [String]
  ) {
    addTask(
      columnId: $columnId
      title: $title
      description: $description
      tags: $tags
    ) {
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
  mutation editTask(
    $id: String
    $title: String
    $description: String
    $tags: [String]
  ) {
    editTask(id: $id, title: $title, description: $description, tags: $tags) {
      id
      title
      description
      tags
    }
  }
`;

export const REMOVE_BOARD = gql`
  mutation removeBoard($id: String) {
    removeBoard(id: $id) {
      id
    }
  }
`;

export const REMOVE_COLUMN = gql`
  mutation removeColumn($id: String) {
    removeColumn(id: $id) {
      id
    }
  }
`;

export const REMOVE_TASK = gql`
  mutation removeTask($id: String) {
    removeTask(id: $id) {
      id
    }
  }
`;

export const REMOVE_SUBTASK = gql`
  mutation removeSubtassk($id: String) {
    removeSubtask(id: $id) {
      id
    }
  }
`;

export const EDIT_SUBTASK = gql`
  mutation editSubtask($id: String, $name: String, $isFinished: Boolean) {
    editSubtask(id: $id, name: $name, isFinished: $isFinished) {
      id
      name
      isFinished
    }
  }
`;

export const ADD_SUBTASK = gql`
  mutation addSubtask($name: String, $isFinished: String, $taskId: String) {
    addSubtask(name: $name, isFinished: $isFinished, taskId: $taskId) {
      id
      name
      isFinished
    }
  }
`;
