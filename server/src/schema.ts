import { gql } from 'apollo-server'
import { Context } from './context'

import { GraphQLScalarType, Kind } from 'graphql'

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
    taskId: String
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
    columnId: String
    createdAt: Date
    updatedAt: Date
    userOnTask: [UserOnTask]
  }

  type Column {
    id: String
    name: String
    dotColor: String
    tasks: [Task]
    columnWrapperId: String
    boardId: String
    createdAt: Date
    updatedAt: Date
  }

  type ColumnWrapper {
    id: String
    column: Column
    columnId: String
  }

  type Board {
    id: String
    name: String
    columns: [ColumnWrapper]
    projectId: String
    Project: Project
    createdAt: Date
    updatedAt: Date
  }

  type Project {
    id: String
    name: String
    boards: [Board]
    userId: String
    usersOnProject: UserOnProject
    createdAt: Date
    updatedAt: Date
  }

  type User {
    id: String
    name: String
    email: String
    usersOnProject: UserOnProject
    userOnTask: UserOnTask
    createdAt: Date
    updatedAt: Date
  }

  type UserOnProject {
    user: User
    project: Project
    userId: String
    projectId: String
    createdAt: Date
    updatedAt: Date
  }

  type UserOnTask {
    user: User
    task: Task
    userId: String
    taskId: String
    createdAt: Date
    updatedAt: Date
  }

  type Query {
    projects(userId: String): [Project]
    filteredUsers(text: String): [User]
    usersFromProject(projectId: String): [UserOnProject]
    usersFromTask(taskId: String): [UserOnTask]
    getTasksFromUser(userId: String): [UserOnTask]
    getUsersAndTasks: [UserOnTask]
  }

  type Mutation {
    changeColumnWrapper(currColumnWrapperId: String, prevColumnWrapperId: String, currColumnId: String, prevColumnId: String, boardId: String): ColumnWrapper
    changeColumn(columnId: String, taskId: String): Column
    addUser(name: String, email: String, id: String): User
    addUserToProject(projectId: String, userId: String): UserOnProject
    removeUserFromProject(projectId: String, userId: String): UserOnProject
    removeUserFromTask(taskId: String, userId: String): UserOnTask
    addUserToTask(userId: String, taskId: String): UserOnTask
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
        where: {
          usersOnProject: {
            some: {
              userId: args.userId,
            },
          },
        },
        select: {
          id: true,
          name: true,
          userId: true,
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
                  column: {
                    select: {
                      id: true,
                      name: true,
                      dotColor: true,
                      columnWrapperId: true,
                      createdAt: true,
                      updatedAt: true,
                      tasks: {
                        select: {
                          id: true,
                          title: true,
                          tagNames: true,
                          tagBackgroundColors: true,
                          tagFontColors: true,
                          description: true,
                          createdAt: true,
                          updatedAt: true,
                          subtasks: {
                            select: {
                              id: true,
                              name: true,
                              isFinished: true,
                              createdAt: true,
                              updatedAt: true,
                            },
                            orderBy: {
                              createdAt: 'asc',
                            },
                          },
                        },
                        orderBy: {
                          title: 'asc',
                        },
                      },
                      
                    },
                  }
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
      })
    },
    filteredUsers: (
      _parent: unknown,
      args: { text: string },
      context: Context,
    ) => {
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
      args: { projectId: string },
      context: Context,
    ) => {
      return context.prisma.userOnProject.findMany({
        where: {
          project: {
            id: args.projectId,
          },
        },
        select: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      })
    },
    usersFromTask: (
      _parent: unknown,
      args: { taskId: string },
      context: Context,
    ) => {
      return context.prisma.userOnTask.findMany({
        where: {
          taskId: args.taskId,
        },
        select: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      })
    },
    getTasksFromUser: (
      _parent: unknown,
      args: { userId: string },
      context: Context,
    ) => {
      return context.prisma.userOnTask.findMany({
        where: {
          userId: args.userId,
        },
        select: {
          task: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      })
    },
    getUsersAndTasks: (_parent: unknown, args: null, context: Context) => {
      return context.prisma.userOnTask.findMany()
    },
  },

  Mutation: {
    changeColumnWrapper: async (_parent: unknown, args: { currColumnWrapperId: string, prevColumnWrapperId: string, currColumnId: string, prevColumnId: string, boardId: string}, context: Context) => {
      const response = await context.prisma.columnWrapper.create({
        data: {
          boardId: args.boardId,
        }
      })

      await context.prisma.column.update({
        where: { id: args.currColumnId },
        data: { columnWrapperId: response.id }
      })

      await context.prisma.column.update({
        where: {
          id: args.prevColumnId,
        },
        data: {
          columnWrapperId: args.currColumnWrapperId
        }
      })

      await context.prisma.column.update({
        where: {
          id: args.currColumnId
        },
        data: {
          columnWrapperId: args.prevColumnWrapperId
        }
      })

      return await context.prisma.columnWrapper.delete({
        where: { id: response.id }
      })
    },
    addUserToTask: (
      _parent: unknown,
      args: { userId: string; taskId: string },
      context: Context,
    ) => {
      return context.prisma.userOnTask.create({
        data: {
          userId: args.userId,
          taskId: args.taskId,
        },
      })
    },
    removeUserFromTask: (
      _parent: unknown,
      args: { userId: string; taskId: string },
      context: Context,
    ) => {
      return context.prisma.userOnTask.delete({
        where: {
          userId_taskId: {
            userId: args.userId,
            taskId: args.taskId,
          },
        },
      })
    },
    addUserToProject: async (
      _parent: unknown,
      args: { projectId: string; userId: string },
      context: Context,
    ) => {
      return context.prisma.userOnProject.create({
        data: {
          projectId: args.projectId,
          userId: args.userId,
        },
      })
    },
    removeUserFromProject: async (
      _parent: unknown,
      args: { projectId: string; userId: string },
      context: Context,
    ) => {
      return context.prisma.userOnProject.delete({
        where: {
          userId_projectId: {
            projectId: args.projectId,
            userId: args.userId,
          },
        },
      })
    },
    addUser: (
      _parent: any,
      args: { name: string; email: string; id: string },
      context: Context,
    ) => {
      return context.prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          id: args.id,
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
          usersOnProject: {
            create: {
              userId: args.userId,
            },
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
    addColumn: async (
      _parent: any,
      args: { boardId: string; name: string; dotColor: string },
      context: Context,
    ) => {
      const response = await context.prisma.columnWrapper.create({
        data: {
          boardId: args.boardId
        }
      })

      return context.prisma.column.create({
        data: {
          name: args.name,
          dotColor: args.dotColor,
          columnWrapperId: response.id
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
