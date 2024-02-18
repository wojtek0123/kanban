import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import { GraphQLScalarType, Kind } from "graphql";

export const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value: any) {
    // return value.getTime(); // Convert outgoing Date to integer for JSON
    const date = new Date(value);
    return date.toISOString();
  },
  parseValue(value: any) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const prisma = new PrismaClient();

const typeDefs = `#graphql
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
    order: Int
    boardId: String
    createdAt: Date
    updatedAt: Date
  }

  type Board {
    id: String
    name: String
    columns: [Column]
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
    project(userId: String, projectId: String): Project
    projects(userId: String): [Project]
    board(id: String): Board
    filteredUsers(text: String): [User]
    usersFromProject(projectId: String): [UserOnProject]
    usersFromTask(taskId: String): [UserOnTask]
    getTasksFromUser(userId: String): [UserOnTask]
    getUsersAndTasks: [UserOnTask]
    projectAndBoardNames(userId: String): [Project]
  }
    
  type Mutation {
    changeColumnOrder(
      currOrder: Int
      prevOrder: Int
      currColumnId: String
      prevColumnId: String
    ): Column
    changeColumn(columnId: String, taskId: String): Task
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
    updateUserName(id: String, name: String): User
  }
`;

const resolvers = {
  Query: {
    projectAndBoardNames: (_: unknown, { userId }: { userId: string }) => {
      return prisma.project.findMany({
        where: { userId },
        select: {
          id: true,
          name: true,
          boards: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    },
    project: (
      _: unknown,
      { userId, projectId }: { userId: string; projectId: string },
    ) => {
      return prisma.project.findUnique({
        where: { id: projectId, userId },
        include: {
          usersOnProject: {
            include: {
              user: true,
            },
          },
          boards: {
            include: {
              columns: {
                include: {
                  tasks: {
                    include: {
                      subtasks: true,
                      userOnTask: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    },
    board: (_parent: unknown, args: { id: string }) => {
      return prisma.board.findUnique({
        where: { id: args.id },
        select: {
          Project: {
            select: {
              userId: true,
            },
          },
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          columns: {
            select: {
              id: true,
              name: true,
              dotColor: true,
              boardId: true,
              order: true,
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
                      createdAt: "asc",
                    },
                  },
                },
                orderBy: {
                  title: "asc",
                },
              },
            },
          },
        },
      });
    },
    projects: (_parent: any, args: { userId: string }) => {
      return prisma.project.findMany({
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
                  name: true,
                  dotColor: true,
                  order: true,
                  boardId: true,
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
                          createdAt: "asc",
                        },
                      },
                    },
                    orderBy: {
                      title: "asc",
                    },
                  },
                },
                orderBy: {
                  order: "asc",
                },
              },
            },
            orderBy: {
              createdAt: "asc",
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    },
    filteredUsers: (_parent: unknown, args: { text: string }) => {
      return prisma.user.findMany({
        where: {
          email: {
            contains: args.text,
          },
        },
      });
    },
    usersFromProject: (_parent: unknown, args: { projectId: string }) => {
      return prisma.userOnProject.findMany({
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
      });
    },
    usersFromTask: (_parent: unknown, args: { taskId: string }) => {
      return prisma.userOnTask.findMany({
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
      });
    },
    getTasksFromUser: (_parent: unknown, args: { userId: string }) => {
      return prisma.userOnTask.findMany({
        where: {
          userId: args.userId,
        },
        select: {
          task: {
            select: {
              id: true,
              title: true,
              tagNames: true,
              tagBackgroundColors: true,
              tagFontColors: true,
              description: true,
              createdAt: true,
              columnId: true,
              column: {
                select: {
                  name: true,
                },
              },
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
                  createdAt: "asc",
                },
              },
            },
          },
        },
      });
    },
    getUsersAndTasks: (_parent: unknown, args: null) => {
      return prisma.userOnTask.findMany();
    },
  },

  Mutation: {
    updateUserName: (_parent: unknown, args: { id: string; name: string }) => {
      return prisma.user.update({
        where: { id: args.id },
        data: { name: args.name },
      });
    },
    changeColumnOrder: async (
      _parent: unknown,
      args: {
        currOrder: number;
        prevOrder: number;
        currColumnId: string;
        prevColumnId: string;
      },
    ) => {
      await prisma.column.update({
        where: {
          id: args.prevColumnId,
        },
        data: {
          order: args.currOrder,
        },
      });

      return await prisma.column.update({
        where: {
          id: args.currColumnId,
        },
        data: {
          order: args.prevOrder,
        },
      });
    },
    addUserToTask: (
      _parent: unknown,
      args: { userId: string; taskId: string },
    ) => {
      return prisma.userOnTask.create({
        data: {
          userId: args.userId,
          taskId: args.taskId,
        },
      });
    },
    removeUserFromTask: (
      _parent: unknown,
      args: { userId: string; taskId: string },
    ) => {
      return prisma.userOnTask.delete({
        where: {
          userId_taskId: {
            userId: args.userId,
            taskId: args.taskId,
          },
        },
      });
    },
    addUserToProject: async (
      _parent: unknown,
      args: { projectId: string; userId: string },
    ) => {
      return prisma.userOnProject.create({
        data: {
          projectId: args.projectId,
          userId: args.userId,
        },
      });
    },
    removeUserFromProject: async (
      _parent: unknown,
      args: { projectId: string; userId: string },
    ) => {
      return prisma.userOnProject.delete({
        where: {
          userId_projectId: {
            projectId: args.projectId,
            userId: args.userId,
          },
        },
      });
    },
    addUser: (
      _parent: any,
      args: { name: string; email: string; id: string },
    ) => {
      return prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          id: args.id,
        },
      });
    },
    changeColumn: (
      _parent: any,
      args: { columnId: string; taskId: string },
    ) => {
      return prisma.task.update({
        where: { id: args.taskId },
        data: {
          columnId: args.columnId,
        },
      });
    },
    changeCompletionState: (
      _parent: any,
      args: { id: string; state: boolean },
    ) => {
      return prisma.subtask.update({
        where: { id: args.id },
        data: { isFinished: args.state },
      });
    },
    editProject: (_parent: any, args: { id: string; name: string }) => {
      return prisma.project.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
        },
      });
    },
    editBoard: (_parent: any, args: { id: string; name: string }) => {
      return prisma.board.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
        },
      });
    },
    editColumn: (
      _parent: any,
      args: { id: string; name: string; dotColor: string },
    ) => {
      return prisma.column.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
          dotColor: args.dotColor,
        },
      });
    },
    editTask: (
      _parent: any,
      args: {
        id: string;
        title: string;
        description: string;
        tagNames: string[];
        tagFontColors: string[];
        tagBackgroundColors: string[];
      },
    ) => {
      return prisma.task.update({
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
      });
    },
    editSubtask: (
      _parent: any,
      args: { id: string; name: string; isFinished: boolean },
    ) => {
      return prisma.subtask.update({
        where: {
          id: args.id,
        },
        data: {
          name: args.name,
        },
      });
    },
    addProject: (_parent: any, args: { name: string; userId: string }) => {
      return prisma.project.create({
        data: {
          name: args.name,
          userId: args.userId,
          usersOnProject: {
            create: {
              userId: args.userId,
            },
          },
        },
      });
    },
    addBoard: (_parent: any, args: { name: string; projectId: string }) => {
      return prisma.board.create({
        data: {
          name: args.name,
          projectId: args.projectId,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          projectId: true,
          columns: {
            select: {
              id: true,
              name: true,
              boardId: true,
              dotColor: true,
              order: true,
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
                      createdAt: "asc",
                    },
                  },
                },
                orderBy: {
                  title: "asc",
                },
              },
            },
          },
        },
      });
    },
    addColumn: async (
      _parent: any,
      args: { boardId: string; name: string; dotColor: string },
    ) => {
      const response = await prisma.column.findMany({
        where: { boardId: args.boardId },
        orderBy: { createdAt: "desc" },
        take: 1,
      });

      let order = 0;
      const newColumnMustHaveGreaterOrder = 1;

      if (response.length !== 0) {
        order = response[0].order + newColumnMustHaveGreaterOrder;
      }

      return prisma.column.create({
        data: {
          name: args.name,
          dotColor: args.dotColor,
          boardId: args.boardId,
          order,
        },
      });
    },
    addTask: (
      _parent: any,
      args: {
        columnId: string;
        title: string;
        description: string;
        tagNames: string[];
        tagFontColors: string[];
        tagBackgroundColors: string[];
      },
    ) => {
      return prisma.task.create({
        data: {
          title: args.title,
          description: args.description,
          tagNames: args.tagNames,
          tagFontColors: args.tagFontColors,
          tagBackgroundColors: args.tagBackgroundColors,
          columnId: args.columnId,
        },
      });
    },
    addSubtask: (
      _parent: any,
      args: { name: string; isFinished: boolean; taskId: string },
    ) => {
      return prisma.subtask.create({
        data: {
          name: args.name,
          isFinished: args.isFinished,
          taskId: args.taskId,
        },
      });
    },
    removeProject: (_parent: any, args: { id: string }) => {
      return prisma.project.delete({ where: { id: args.id } });
    },
    removeBoard: (_parent: any, args: { id: string }) => {
      return prisma.board.delete({ where: { id: args.id } });
    },
    removeColumn: (_parent: any, args: { id: string }) => {
      return prisma.column.delete({ where: { id: args.id } });
    },
    removeTask: (_parent: any, args: { id: string }) => {
      return prisma.task.delete({ where: { id: args.id } });
    },
    removeSubtask: (_parent: any, args: { id: string }) => {
      return prisma.subtask.delete({ where: { id: args.id } });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
