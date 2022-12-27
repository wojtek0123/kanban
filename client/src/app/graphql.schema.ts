import { gql } from 'apollo-angular';

export const GET_PROJECTS = gql`
  query projects($userId: String) {
    projects(userId: $userId) {
      id
      name
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
            tagNames
            tagFontColors
            tagBackgroundColors
            subtasks {
              id
              isFinished
              name
            }
          }
        }
      }
    }
  }
`;

export const CHANGE_COLUMN = gql`
  mutation changeColumn($columnId: String, $taskId: String) {
    changeColumn(columnId: $columnId, taskId: $taskId) {
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
`;

export const ADD_PROJECT = gql`
  mutation addProject($name: String, $userId: String) {
    addProject(name: $name, userId: $userId) {
      id
      name
    }
  }
`;

export const EDIT_PROJECT = gql`
  mutation editProject($id: String, $name: String) {
    editProject(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const ADD_BOARD = gql`
  mutation addBoard($name: String, $projectId: String) {
    addBoard(name: $name, projectId: $projectId) {
      id
      name
      columns {
        id
        name
        tasks {
          id
          tags
          description
          title
          subtasks {
            id
            name
            isFinished
          }
        }
      }
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

export const ADD_SUBTASK = gql`
  mutation addSubtask($name: String, $isFinished: Boolean, $taskId: String) {
    addSubtask(name: $name, isFinished: $isFinished, taskId: $taskId) {
      id
      name
      isFinished
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
    $tagNames: [String]
  ) {
    editTask(
      id: $id
      title: $title
      description: $description
      tagNames: $tagNames
    ) {
      id
      title
      description
      tagNames
    }
  }
`;

export const EDIT_SUBTASK = gql`
  mutation editSubtask($id: String, $name: String) {
    editSubtask(id: $id, name: $name) {
      id
      name
      isFinished
    }
  }
`;

export const CHANGE_COMPLETION_STATE = gql`
  mutation changeCompletionState($id: String, $state: Boolean) {
    changeCompletionState(id: $id, state: $state) {
      id
      name
      isFinished
    }
  }
`;

export const REMOVE_PROJECT = gql`
  mutation removeProject($id: String) {
    removeProject(id: $id) {
      id
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
  mutation removeSubtask($id: String) {
    removeSubtask(id: $id) {
      id
    }
  }
`;
