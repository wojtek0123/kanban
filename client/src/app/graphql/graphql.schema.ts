import { gql } from 'apollo-angular';

export const GET_PROJECTS = gql`
  query projects($userId: String) {
    projects(userId: $userId) {
      id
      name
      userId
      usersOnProject {
        user {
          email
          id
          name
        }
      }
      createdAt
      updatedAt
      boards {
        id
        name
        createdAt
        updatedAt
        columns {
          id
          name
          dotColor
          createdAt
          updatedAt
          tasks {
            id
            title
            description
            tagNames
            tagFontColors
            tagBackgroundColors
            createdAt
            updatedAt
            subtasks {
              id
              isFinished
              name
              createdAt
              updatedAt
            }
          }
        }
      }
    }
  }
`;

export const GET_USERS = gql`
  query users {
    users {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;

export const ADD_USER_TO_PROJECT = gql`
  mutation AddUserToProject($projectId: String, $userId: String) {
    addUserToProject(projectId: $projectId, userId: $userId) {
      user {
        email
        id
        name
      }
      project {
        id
        name
      }
    }
  }
`;

export const REMOVE_USER_FROM_PROJECT = gql`
  mutation RemoveUserFromProject($projectId: String, $userId: String) {
    removeUserFromProject(projectId: $projectId, userId: $userId) {
      id
      usersOnProject {
        user {
          email
          id
          name
        }
      }
      userId
      updatedAt
      name
      createdAt
    }
  }
`;

export const GET_USERS_FROM_PROJECT = gql`
  query UsersFromProject($projectId: String) {
    usersFromProject(projectId: $projectId) {
      user {
        email
        id
        name
      }
    }
  }
`;

export const GET_FILTERED_USERS = gql`
  query filteredUsers($text: String) {
    filteredUsers(text: $text) {
      id
      name
      email
      createdAt
      updatedAt
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
`;

export const ADD_USER = gql`
  mutation addUser($name: String, $email: String, $id: String) {
    addUser(name: $name, email: $email, id: $id) {
      id
      name
      email
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
      createdAt
      updatedAt
      projectId
      columns {
        createdAt
        dotColor
        id
        name
        updatedAt
        tasks {
          createdAt
          description
          id
          tagBackgroundColors
          tagFontColors
          title
          updatedAt
          tagNames
          subtasks {
            id
            isFinished
            name
            updatedAt
            createdAt
          }
        }
      }
    }
  }
`;
export const ADD_COLUMN = gql`
  mutation addColumn($boardId: String, $name: String, $dotColor: String) {
    addColumn(boardId: $boardId, name: $name, dotColor: $dotColor) {
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
  mutation editColumn($id: String, $name: String, $dotColor: String) {
    editColumn(id: $id, name: $name, dotColor: $dotColor) {
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
