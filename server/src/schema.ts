import { gql } from 'apollo-server'
import { context, Context } from './context'

export const typeDefs = gql`
  type Subtask {
    id: String
    isFinished: Boolean
    name: String
  }

  type Task {
    id: String
    title: String
    description: String
    tags: [String]
    subtasks: [Subtask]
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
    boards: [Board]
  }

  type Mutation {
    editBoard(id: String, name: String): Board
    editColumn(id: String, name: String): Column
    editTask(
      id: String
      title: String
      description: String
      tags: [String]
    ): Task
    editSubtask(is: String, name: String, isFinished: Boolean): Subtask
    addBoard(name: String): Board
    addColumn(boardId: String, name: String): Column
    addTask(
      columnId: String
      title: String
      description: String
      tags: [String]
    ): Task
    addSubtask(name: String, isFinished: Boolean): Subtask
    removeBoard(id: String): Board
    removeColumn(id: String): Column
    removeTask(id: String): Task
    removeSubtask(id: String): Subtask
  }
`

export const resolvers = {
  Query: {
    boards: (_parent: any, _args: any, context: Context) => {
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
    editBoard: (
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
    editColumn: (
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
    editTask: (
      _parent: any,
      args: { id: string; title: string; description: string; tags: string[] },
      context: Context,
    ) => {
      return context.prisma.task.update({
        where: {
          id: args.id,
        },
        data: {
          title: args.title,
          description: args.description,
          tags: args.tags,
        },
      })
    },
    editSubTask: (
      _parent: any,
      args: { id: string; name: string; isFinished: boolean },
      context: Context,
    ) => {
      return context.prisma.subtask.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
          isFinished: args.isFinished,
        },
      })
    },
    addBoard: (_parent: any, args: { name: string }, context: Context) => {
      return context.prisma.board.create({
        data: {
          name: args.name,
        },
      })
    },
    addColumn: (
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
    addTask: (
      _parent: any,
      args: {
        columnId: string
        title: string
        description: string
        tags: string[]
      },
      context: Context,
    ) => {
      return context.prisma.task.create({
        data: {
          title: args.title,
          description: args.description,
          tags: args.tags,
          columnId: args.columnId,
        },
      })
    },
    addSubtask: (
      _parent: any,
      args: { name: string; isFinished: boolean; taskId: string },
      context: Context,
    ) => {
      return context.prisma.subtask.create({
        data: {
          name: args.name,
          isFinished: args.isFinished,
          taskId: args.taskId,
        },
      })
    },
    removeBoard: (_parent: any, args: { id: string }, context: Context) => {
      return context.prisma.board.delete({ where: { id: args.id } })
    },
    removeColumn: (_parent: any, args: { id }, context: Context) => {
      return context.prisma.column.delete({ where: { id: args.id } })
    },
    removeTask: (_parent: any, args: { id: string }, context: Context) => {
      return context.prisma.task.delete({ where: { id: args.id } })
    },
    removeSubtask: (_parent: any, args: { id: string }, context: Context) => {
      return context.prisma.subtask.delete({ where: { id: args.id } })
    },
  },
}
