import { gql } from 'apollo-angular';

export const ADD_SUBTASK = gql`
  mutation addSubtask($name: String, $isFinished: Boolean, $taskId: String) {
    addSubtask(name: $name, isFinished: $isFinished, taskId: $taskId) {
      id
      name
      isFinished
    }
  }
`;
