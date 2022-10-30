import { gql } from 'apollo-server'
import { Context } from './context'

export const typeDefs = gql`
  type Task {
    id: String
    title: String
    description: String
  }

  type Column {
    id: String
    name: String
    tasks: [Task]
  }

  type Board {
    id: String
    name: String
    columns: [Column]
  }

  type Query {
    Boards: [Board]
  }
`

export const resolvers = {
  Query: {
    Boards: (_parent: any, _args: any, context: Context) => {
      return context.prisma.board.findMany({
        select: {
          id: true,
          name: true,
          columns: {
            select: {
              id: true,
              name: true,
              tasks: true,
            },
          },
        },
      })
    },
  },
}
