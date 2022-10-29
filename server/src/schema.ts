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
    allBoards: [Board]
  }
`

export const resolvers = {
  Query: {
    allBoards: (_parent: any, _args: any, context: Context) => {
      return context.prisma.board.findMany({
        select: {
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
