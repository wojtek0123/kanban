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
