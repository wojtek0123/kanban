import { gql } from 'apollo-angular';

export const GET_USERS_AND_TASKS = gql`
  query GetUsersAndTasks {
    getUsersAndTasks {
      taskId
      userId
    }
  }
`;
