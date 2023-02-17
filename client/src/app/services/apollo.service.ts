import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  ADD_BOARD,
  ADD_COLUMN,
  ADD_PROJECT,
  ADD_SUBTASK,
  ADD_TASK,
  ADD_USER,
  ADD_USER_TO_PROJECT,
  ADD_USER_TO_TASK,
  CHANGE_COLUMN,
  CHANGE_COMPLETION_STATE,
  EDIT_BOARD,
  EDIT_COLUMN,
  EDIT_PROJECT,
  EDIT_SUBTASK,
  EDIT_TASK,
  GET_FILTERED_USERS,
  GET_PROJECTS,
  GET_USERS,
  GET_USERS_FROM_PROJECT,
  GET_USERS_FROM_TASK,
  REMOVE_BOARD,
  REMOVE_COLUMN,
  REMOVE_PROJECT,
  REMOVE_SUBTASK,
  REMOVE_TASK,
  REMOVE_USER_FROM_PROJECT,
  REMOVE_USER_FROM_TASK,
} from '../graphql/graphql.schema';
import { SupabaseService } from './supabase.service';
import { combineLatest, map, mapTo, switchMap, take, tap } from 'rxjs';
import { Board } from '../models/board.model';
import { FormType } from '../models/types';
import { Project } from '../models/project.model';
import { User } from '../models/user.model';
import { BoardService } from './board.service';

@Injectable({
  providedIn: 'root',
})
export class ApolloService {
  constructor(
    private apollo: Apollo,
    private supabase: SupabaseService,
    private board: BoardService
  ) {}

  getProjects() {
    return this.supabase.getSessionObs.pipe(
      map(session => session?.user.id ?? ''),
      switchMap(userId =>
        this.apollo
          .watchQuery<{ projects: Project[] }>({
            query: GET_PROJECTS,
            variables: { userId },
            errorPolicy: 'all',
          })
          .valueChanges.pipe(map(data => data))
      )
    );
  }

  getUsers() {
    return this.apollo
      .watchQuery<{ users: User[] }>({ query: GET_USERS })
      .valueChanges.pipe(map(data => data));
  }

  getFilteredUsers(text: string) {
    return this.apollo
      .watchQuery<{ filteredUsers: User[] }>({
        query: GET_FILTERED_USERS,
        variables: {
          text,
        },
      })
      .valueChanges.pipe(map(data => data));
  }

  getUsersFromProject(projectId: string) {
    return this.apollo.watchQuery<{ usersFromProject: { user: User }[] }>({
      query: GET_USERS_FROM_PROJECT,
      variables: {
        projectId,
      },
    }).valueChanges;
  }

  getUsersFromTask(taskId: string) {
    return this.apollo.watchQuery<{ usersFromTask: { user: User }[] }>({
      query: GET_USERS_FROM_TASK,
      variables: {
        taskId,
      },
    }).valueChanges;
  }

  addUserToProject(projectId: string, userId: string) {
    return this.apollo.mutate<{
      addUserToProject: Project;
    }>({
      mutation: ADD_USER_TO_PROJECT,
      variables: {
        projectId,
        userId,
      },
      refetchQueries: [
        {
          query: GET_USERS_FROM_PROJECT,
          variables: {
            projectId: projectId,
          },
        },
      ],
    });
  }

  addUserToTask(taskId: string, userId: string) {
    return this.apollo.mutate<{}>({
      mutation: ADD_USER_TO_TASK,
      variables: {
        taskId,
        userId,
      },
      refetchQueries: [
        {
          query: GET_USERS_FROM_TASK,
          variables: {
            taskId,
          },
        },
      ],
    });
  }

  removeUserFromProject(projectId: string, userId: string) {
    return this.apollo.mutate<{
      removeUserFromProject: {
        projectId: string;
        userId: string;
      };
    }>({
      mutation: REMOVE_USER_FROM_PROJECT,
      variables: {
        projectId,
        userId,
      },
      refetchQueries: [
        {
          query: GET_USERS_FROM_PROJECT,
          variables: {
            projectId: projectId,
          },
        },
      ],
    });
  }

  removeUserFromTask(taskId: string, userId: string) {
    return this.apollo.mutate<{
      removeUserFromTask: {
        taskId: string;
        userId: string;
      };
    }>({
      mutation: REMOVE_USER_FROM_TASK,
      variables: {
        taskId,
        userId,
      },
      refetchQueries: [
        {
          query: GET_USERS_FROM_TASK,
          variables: {
            taskId: taskId,
          },
        },
      ],
    });
  }

  addProject(name: string) {
    return this.supabase.getSessionObs.pipe(
      map(session => session?.user.id ?? ''),
      switchMap(userId =>
        this.apollo.mutate<{ addProject: { id: string; name: string } }>({
          mutation: ADD_PROJECT,
          variables: { name, userId },
          refetchQueries: [
            {
              query: GET_PROJECTS,
              variables: {
                userId,
              },
            },
          ],
        })
      ),
      take(1)
    );
  }

  addBoard(name: string, projectId: string) {
    return this.supabase.getSessionObs.pipe(
      map(session => session?.user.id ?? ''),
      switchMap(userId =>
        this.apollo.mutate<{ addBoard: Board }>({
          mutation: ADD_BOARD,
          variables: { name, projectId },
          refetchQueries: [
            {
              query: GET_PROJECTS,
              variables: {
                userId,
              },
            },
          ],
        })
      ),
      take(1)
    );
  }

  addColumn(name: string, dotColor: string) {
    const userId$ = this.supabase.getSessionObs.pipe(
      map(session => session?.user.id ?? '')
    );

    const boardId$ = this.board.getSelectedBoard.pipe(
      map(board => board?.id ?? '')
    );

    return combineLatest([userId$, boardId$]).pipe(
      switchMap(([userId, boardId]) =>
        this.apollo.mutate<{ addColumn: { id: string; name: string } }>({
          mutation: ADD_COLUMN,
          variables: { name, boardId, dotColor },
          refetchQueries: [
            {
              query: GET_PROJECTS,
              variables: {
                userId,
              },
            },
          ],
        })
      ),
      take(1)
    );
  }

  addTask(
    title: string,
    description: string,
    tagNames: string[],
    tagFontColors: string[],
    tagBackgroundColors: string[]
  ) {
    return this.supabase.getSessionObs.pipe(
      map(session => session?.user.id ?? ''),
      switchMap(userId =>
        this.board.getSelectedColumnId.pipe(
          switchMap(columnId =>
            this.apollo.mutate<{ addTask: { id: string } }>({
              mutation: ADD_TASK,
              variables: {
                title,
                description,
                columnId,
                tagNames,
                tagFontColors,
                tagBackgroundColors,
              },
              refetchQueries: [
                {
                  query: GET_PROJECTS,
                  variables: {
                    userId,
                  },
                },
              ],
            })
          )
        )
      ),
      take(1)
    );
  }

  addSubtask(name: string, isFinished: boolean) {
    return this.supabase.getSessionObs.pipe(
      map(session => session?.user.id ?? ''),
      switchMap(userId =>
        this.board.getSelectedTaskId.pipe(
          switchMap(taskId =>
            this.apollo.mutate<{ addSubtask: { id: string; name: string } }>({
              mutation: ADD_SUBTASK,
              variables: { name, isFinished, taskId },
              refetchQueries: [
                {
                  query: GET_PROJECTS,
                  variables: {
                    userId,
                  },
                },
              ],
            })
          )
        )
      ),
      take(1)
    );
  }

  addUser(name: string, email: string, id: string) {
    return this.apollo.mutate({
      mutation: ADD_USER,
      variables: { name, email, id },
    });
  }

  editProject(id: string, name: string) {
    return this.supabase.getSessionObs.pipe(
      map(session => session?.user.id ?? ''),
      switchMap(userId =>
        this.apollo.mutate<{ editProject: { id: string; name: string } }>({
          mutation: EDIT_PROJECT,
          variables: { id, name },
          refetchQueries: [
            {
              query: GET_PROJECTS,
              variables: {
                userId,
              },
            },
          ],
        })
      ),
      take(1)
    );
  }

  editBoard(id: string, name: string) {
    return this.supabase.getSessionObs.pipe(
      map(session => session?.user.id ?? ''),
      switchMap(userId =>
        this.apollo.mutate<{ editBoard: { id: string; name: string } }>({
          mutation: EDIT_BOARD,
          variables: { id, name },
          refetchQueries: [
            {
              query: GET_PROJECTS,
              variables: {
                userId,
              },
            },
          ],
        })
      ),
      take(1)
    );
  }

  editColumn(id: string, name: string, dotColor: string) {
    return this.supabase.getSessionObs.pipe(
      map(session => session?.user.id ?? ''),
      switchMap(userId =>
        this.apollo.mutate<{ editColumn: { id: string; name: string } }>({
          mutation: EDIT_COLUMN,
          variables: { id, name, dotColor },
          refetchQueries: [
            {
              query: GET_PROJECTS,
              variables: {
                userId,
              },
            },
          ],
        })
      ),
      take(1)
    );
  }

  editTask(
    id: string,
    title: string,
    description: string,
    tagNames: string[],
    tagFontColors: string[],
    tagBackgroundColors: string[]
  ) {
    return this.supabase.getSessionObs.pipe(
      map(session => session?.user.id ?? ''),
      switchMap(userId =>
        this.apollo.mutate<{
          editTask: {
            id: string;
            title: string;
            description: string;
            tagNames: string[];
            tagFontColors: string[];
            tagBackgroundColors: string[];
          };
        }>({
          mutation: EDIT_TASK,
          variables: {
            id,
            title,
            description,
            tagNames,
            tagFontColors,
            tagBackgroundColors,
          },
          refetchQueries: [
            {
              query: GET_PROJECTS,
              variables: {
                userId,
              },
            },
          ],
        })
      ),
      take(1)
    );
  }

  editSubtask(id: string, name: string) {
    return this.supabase.getSessionObs.pipe(
      map(session => session?.user.id ?? ''),
      switchMap(userId =>
        this.apollo.mutate<{
          editSubtask: { id: string; name: string };
        }>({
          mutation: EDIT_SUBTASK,
          variables: { id, name },
          refetchQueries: [
            {
              query: GET_PROJECTS,
              variables: {
                userId,
              },
            },
          ],
        })
      ),
      take(1)
    );
  }

  remove(id: string, type: FormType) {
    let mutation: any;
    switch (type) {
      case 'project':
        mutation = REMOVE_PROJECT;
        break;
      case 'board':
        mutation = REMOVE_BOARD;
        break;
      case 'column':
        mutation = REMOVE_COLUMN;
        break;
      case 'task':
        mutation = REMOVE_TASK;
        break;
      case 'subtask':
        mutation = REMOVE_SUBTASK;
        break;
    }
    return this.supabase.getSessionObs.pipe(
      map(session => session?.user.id ?? ''),
      switchMap(userId =>
        this.apollo.mutate({
          mutation,
          variables: {
            id,
          },
          refetchQueries: [
            {
              query: GET_PROJECTS,
              variables: {
                userId,
              },
            },
          ],
        })
      ),
      take(1)
    );
  }

  updateCompletionStateOfSubtask(id: string, state: boolean) {
    return this.supabase.getSessionObs.pipe(
      map(session => session?.user.id ?? ''),
      switchMap(userId =>
        this.apollo.mutate({
          mutation: CHANGE_COMPLETION_STATE,
          variables: { id, state },
          refetchQueries: [
            {
              query: GET_PROJECTS,
              variables: {
                userId,
              },
            },
          ],
        })
      ),
      take(1)
    );
  }

  changeColumn(columnId: string, taskId: string) {
    return this.supabase.getSessionObs.pipe(
      map(session => session?.user.id ?? ''),
      switchMap(userId =>
        this.apollo.mutate({
          mutation: CHANGE_COLUMN,
          variables: { columnId, taskId },
          refetchQueries: [
            {
              query: GET_PROJECTS,
              variables: {
                userId,
              },
            },
          ],
        })
      ),
      take(1)
    );
  }
}
