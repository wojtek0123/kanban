import { gql } from 'apollo-server'
import { Context } from './context'

import { GraphQLScalarType, Kind } from 'graphql'
import { User } from '@prisma/client'

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value: any) {
    // return value.getTime(); // Convert outgoing Date to integer for JSON
    const date = new Date(value)
    return date.toISOString()
  },
  parseValue(value: any) {
    return new Date(value) // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)) // Convert hard-coded AST string to integer and then to Date
    }
    return null // Invalid hard-coded value (not an integer)
  },
})

export const typeDefs = gql`
  scalar Date

  type Subtask {
    id: String
    isFinished: Boolean
    name: String
    createdAt: Date
    updatedAt: Date
  }

  type Task {
    id: String
    title: String
    description: String
    tagNames: [String]
    tagFontColors: [String]
    tagBackgroundColors: [String]
    subtasks: [Subtask]
    createdAt: Date
    updatedAt: Date
  }

  type Column {
    id: String
    name: String
    dotColor: String
    tasks: [Task]
    createdAt: Date
    updatedAt: Date
  }

  type Board {
    id: String
    name: String
    columns: [Column]
    createdAt: Date
    updatedAt: Date
  }

  type Project {
    id: String
    name: String
    boards: [Board]
    userId: String
    users: [String]
    createdAt: Date
    updatedAt: Date
  }

  type User {
    id: String
    name: String
    email: String
    userId: String
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    projects(userId: String): [Project]
    users: [User]
    filteredUsers(text: String): [User]
    usersFromProject(userIds: [String]): [User]
  }

  type Mutation {
    changeColumn(columnId: String, taskId: String): Column
    addUser(name: String, email: String, userId: String): User
    addUserToProject(projectId: String, userId: String): Project
    removeUserFromProject(projectId: String, userId: String): Project
    addProject(name: String, userId: String): Project
    addBoard(name: String, projectId: String): Board
    addColumn(boardId: String, name: String, dotColor: String): Column
    addTask(
      columnId: String
      title: String
      description: String
      tagNames: [String]
      tagFontColors: [String]
      tagBackgroundColors: [String]
    ): Task
    addSubtask(name: String, isFinished: Boolean, taskId: String): Subtask
    editProject(id: String, name: String): Project
    editBoard(id: String, name: String): Board
    editColumn(id: String, name: String, dotColor: String): Column
    editTask(
      id: String
      title: String
      description: String
      tagNames: [String]
      tagFontColors: [String]
      tagBackgroundColors: [String]
    ): Task
    editSubtask(id: String, name: String, isFinished: Boolean): Subtask
    removeProject(id: String): Project
    removeBoard(id: String): Board
    removeColumn(id: String): Column
    removeTask(id: String): Task
    removeSubtask(id: String): Subtask
    changeCompletionState(id: String, state: Boolean): Subtask
  }
`

export const resolvers = {
  Query: {
    projects: (_parent: any, args: { userId: string }, context: Context) => {
      return context.prisma.project.findMany({
        select: {
          id: true,
          name: true,
          userId: true,
          users: true,
          createdAt: true,
          updatedAt: true,
          boards: {
            select: {
              id: true,
              name: true,
              createdAt: true,
              updatedAt: true,
              columns: {
                select: {
                  id: true,
                  createdAt: true,
                  updatedAt: true,
                  name: true,
                  dotColor: true,
                  tasks: {
                    select: {
                      id: true,
                      createdAt: true,
                      updatedAt: true,
                      title: true,
                      tagNames: true,
                      tagFontColors: true,
                      tagBackgroundColors: true,
                      description: true,
                      subtasks: {
                        select: {
                          createdAt: true,
                          updatedAt: true,
                          id: true,
                          isFinished: true,
                          name: true,
                          taskId: true,
                        },
                        orderBy: {
                          createdAt: 'asc',
                        },
                      },
                    },
                    orderBy: {
                      createdAt: 'desc',
                    },
                  },
                },
                orderBy: {
                  createdAt: 'asc',
                },
              },
            },
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
        where: {
          users: {
            has: args.userId,
          },
        },
      })
    },
    users: (_parent: any, _args: any, context: Context) => {
      return context.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
        },
      })
    },
    filteredUsers: (_parent: any, args: { text: string }, context: Context) => {
      return context.prisma.user.findMany({
        where: {
          email: {
            contains: args.text,
          },
        },
      })
    },
    usersFromProject: (
      _parent: unknown,
      args: { userIds: string[] },
      context: Context,
    ) => {
      return context.prisma.user.findMany({
        where: {
          userId: {
            in: args.userIds,
          },
        },
      })
    },
  },
  Mutation: {
    addUserToProject: async (
      _parent: unknown,
      args: { projectId: string; userId: string },
      context: Context,
    ) => {
      const response = await context.prisma.project.findUnique({
        where: {
          id: args.projectId,
        },
      })

      if (response?.users === undefined) {
        return
      }

      return context.prisma.project.update({
        where: {
          id: args.projectId,
        },
        data: {
          users: {
            set: [...response.users, args.userId],
          },
        },
      })
    },
    removeUserFromProject: async (
      _parent: unknown,
      args: { projectId: string; userId: string },
      context: Context,
    ) => {
      const response = await context.prisma.project.findUnique({
        where: {
          id: args.projectId,
        },
      })

      if (response?.users === undefined) {
        return
      }

      return context.prisma.project.update({
        where: {
          id: args.projectId,
        },
        data: {
          users: {
            set: response.users.filter((user) => user !== args.userId),
          },
        },
      })
    },
    addUser: (
      _parent: any,
      args: { name: string; email: string; userId: string },
      context: Context,
    ) => {
      return context.prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          userId: args.userId,
        },
      })
    },
    changeColumn: (
      _parent: any,
      args: { columnId: string; taskId: string },
      context: Context,
    ) => {
      return context.prisma.task.update({
        where: { id: args.taskId },
        data: {
          columnId: args.columnId,
        },
      })
    },
    changeCompletionState: (
      _parent: any,
      args: { id: string; state: boolean },
      context: Context,
    ) => {
      return context.prisma.subtask.update({
        where: { id: args.id },
        data: { isFinished: args.state },
      })
    },
    editProject: (
      _parent: any,
      args: { id: string; name: string },
      context: Context,
    ) => {
      return context.prisma.project.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
        },
      })
    },
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
      args: { id: string; name: string; dotColor: string },
      context: Context,
    ) => {
      return context.prisma.column.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
          dotColor: args.dotColor,
        },
      })
    },
    editTask: (
      _parent: any,
      args: {
        id: string
        title: string
        description: string
        tagNames: string[]
        tagFontColors: string[]
        tagBackgroundColors: string[]
      },
      context: Context,
    ) => {
      return context.prisma.task.update({
        where: {
          id: args.id,
        },
        data: {
          title: args.title,
          description: args.description,
          tagNames: args.tagNames,
          tagFontColors: args.tagFontColors,
          tagBackgroundColors: args.tagBackgroundColors,
        },
      })
    },
    editSubtask: (
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
        },
      })
    },
    addProject: (
      _parent: any,
      args: { name: string; userId: string },
      context: Context,
    ) => {
      return context.prisma.project.create({
        data: {
          name: args.name,
          userId: args.userId,
          users: {
            set: [args.userId],
          },
        },
      })
    },
    addBoard: (
      _parent: any,
      args: { name: string; projectId: string },
      context: Context,
    ) => {
      return context.prisma.board.create({
        data: {
          name: args.name,
          projectId: args.projectId,
        },
      })
    },
    addColumn: (
      _parent: any,
      args: { boardId: string; name: string; dotColor: string },
      context: Context,
    ) => {
      return context.prisma.column.create({
        data: {
          name: args.name,
          boardId: args.boardId,
          dotColor: args.dotColor,
        },
      })
    },
    addTask: (
      _parent: any,
      args: {
        columnId: string
        title: string
        description: string
        tagNames: string[]
        tagFontColors: string[]
        tagBackgroundColors: string[]
      },
      context: Context,
    ) => {
      return context.prisma.task.create({
        data: {
          title: args.title,
          description: args.description,
          tagNames: args.tagNames,
          tagFontColors: args.tagFontColors,
          tagBackgroundColors: args.tagBackgroundColors,
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
    removeProject: (_parent: any, args: { id: string }, context: Context) => {
      return context.prisma.project.delete({ where: { id: args.id } })
    },
    removeBoard: (_parent: any, args: { id: string }, context: Context) => {
      return context.prisma.board.delete({ where: { id: args.id } })
    },
    removeColumn: (_parent: any, args: { id: string }, context: Context) => {
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
