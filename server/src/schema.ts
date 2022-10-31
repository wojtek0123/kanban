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

  type Mutation {
    EditBoard(id: String, name: String): Board
    EditColumn(id: String, name: String): Column
    EditTask(id: String, title: String, description: String): Task
    AddBoard(name: String): Board
    AddColumn(boardId: String, name: String): Column
    AddTask(columnId: String, title: String, description: String): Task
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
  Mutation: {
    EditBoard: (
      _parent: any,
      args: { id: string; name: string },
      context: Context,
    ) => {
      return context.prisma.board.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
        },
      })
    },
    EditColumn: (
      _parent: any,
      args: { id: string; name: string },
      context: Context,
    ) => {
      return context.prisma.column.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
        },
      })
    },
    EditTask: (
      _parent: any,
      args: { id: string; title: string; description: string },
      context: Context,
    ) => {
      return context.prisma.task.update({
        where: {
          id: args.id,
        },
        data: {
          title: args.title,
          description: args.description,
        },
      })
    },
    AddBoard: (_parent: any, args: { name: string }, context: Context) => {
      return context.prisma.board.create({
        data: {
          name: args.name,
        },
      })
    },
    AddColumn: (
      _parent: any,
      args: { boardId: string; name: string },
      context: Context,
    ) => {
      return context.prisma.column.create({
        data: {
          name: args.name,
          boardId: args.boardId,
        },
      })
    },
    AddTask: (
      _parent: any,
      args: { columnId: string; title: string; description: string },
      context: Context,
    ) => {
      return context.prisma.task.create({
        data: {
          title: args.title,
          description: args.description,
          columnId: args.columnId,
        },
      })
    },
  },
}
