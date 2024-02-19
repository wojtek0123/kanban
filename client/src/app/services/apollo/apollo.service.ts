import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { SupabaseService } from '../supabase/supabase.service';
import { BehaviorSubject, combineLatest, map, switchMap, take } from 'rxjs';
import { Board } from '../../models/board.model';
import { FormType } from '../../models/types';
import { Project } from '../../models/project.model';
import { User } from '../../models/user.model';
import { Task } from '../../models/task.model';
import { GET_FILTERED_USERS } from '../../graphql/queries/get-filtered-users.query';
import { GET_PROJECTS } from '../../graphql/queries/get-projects.query';
import { GET_USERS } from '../../graphql/queries/get-users.query';
import { GET_TASKS_FROM_USER } from '../../graphql/queries/get-tasks-from-user.query';
import { GET_USERS_AND_TASKS } from '../../graphql/queries/get-users-and-tasks.query';
import { GET_USERS_FROM_TASK } from '../../graphql/queries/get-users-from-task.query';
import { GET_USERS_FROM_PROJECT } from '../../graphql/queries/get-users-from-project.query';
import { UPDATE_USER_NAME } from '../../graphql/mutations/update-user-name.mutation';
import { REMOVE_USER_FROM_TASK } from '../../graphql/mutations/remove-user-from-task.mutation';
import { REMOVE_USER_FROM_PROJECT } from '../../graphql/mutations/remove-user-from-project.mutation';
import { REMOVE_TASK } from '../../graphql/mutations/remove-task.mutation';
import { REMOVE_SUBTASK } from '../../graphql/mutations/remove-subtask.mutation';
import { REMOVE_PROJECT } from '../../graphql/mutations/remove-project.mutation';
import { EDIT_TASK } from '../../graphql/mutations/edit-task.mutation';
import { EDIT_SUBTASK } from '../../graphql/mutations/edit-subtask.mutation';
import { REMOVE_BOARD } from '../../graphql/mutations/remove-board.mutation';
import { EDIT_PROJECT } from '../../graphql/mutations/edit-project.mutation';
import { EDIT_COLUMN } from '../../graphql/mutations/edit-column.mutation';
import { EDIT_BOARD } from '../../graphql/mutations/edit-board.mutation';
import { CHANGE_COMPLETION_STATE } from '../../graphql/mutations/change-completion-state.mutation';
import { CHANGE_COLUMN } from '../../graphql/mutations/change-column.mutation';
import { ADD_PROJECT } from '../../graphql/mutations/add-project.mutation';
import { ADD_BOARD } from '../../graphql/mutations/add-board.mutation';
import { ADD_COLUMN } from '../../graphql/mutations/add-column.mutation';
import { ADD_TASK } from '../../graphql/mutations/add-task.mutation';
import { ADD_SUBTASK } from '../../graphql/mutations/add-subtask.mutation';
import { ADD_USER } from '../../graphql/mutations/add-user.mutation';
import { ADD_USER_TO_TASK } from '../../graphql/mutations/add-user-to-task.mutation';
import { ADD_USER_TO_PROJECT } from '../../graphql/mutations/add-user-to-project.mutation';
import { CHANGE_COLUMN_ORDER } from '../../graphql/mutations/change-column-order.mutation';
import { REMOVE_COLUMN } from 'src/app/graphql/mutations/remove-column.mutation';
import { GET_PROJECT_AND_BOARD_NAMES } from '../../graphql/queries/project-and-board-names.query';
import { GET_PROJECT } from '../../graphql/queries/get-project.query';

@Injectable({
  providedIn: 'root',
})
export class ApolloService {
  private _projectOwnerId = new BehaviorSubject('');

  constructor(private apollo: Apollo, private supabase: SupabaseService) {}

  get isLoggedInUserAOwnerOfTheProject$() {
    return combineLatest([this.supabase.session$, this._projectOwnerId]).pipe(
      map(([session, ownerId]) => session?.user.id === ownerId)
    );
  }

  setProjectOwnerId(id: string) {
    this._projectOwnerId.next(id);
  }

  getProjectAndBoardNames() {
    return this.supabase.session$.pipe(
      map(session => session?.user.id ?? ''),
      switchMap(userId =>
        this.apollo
          .watchQuery({
            query: GET_PROJECT_AND_BOARD_NAMES,
            variables: { userId },
            errorPolicy: 'all',
          })
          .valueChanges.pipe(map(response => response.data.projects))
      )
    );
  }

  getProjects() {
    return this.supabase.session$.pipe(
      map(session => session?.user.id ?? ''),
      switchMap(userId =>
        this.apollo
          .watchQuery<{ projects: Project[] }>({
            query: GET_PROJECTS,
            variables: { userId },
          })
          .valueChanges.pipe(map(response => response.data.projects))
      )
    );
  }

  getProject(projectId: string, boardId: string) {
    return this.supabase.session$.pipe(
      map(session => session?.user.id ?? ''),
      switchMap(userId =>
        this.apollo
          .watchQuery({
            query: GET_PROJECT,
            variables: { userId, projectId, boardId },
          })
          .valueChanges.pipe(map(response => response.data.project))
      )
    );
  }

  getUsers() {
    return this.apollo
      .watchQuery<{ users: User[] }>({ query: GET_USERS })
      .valueChanges.pipe(map(response => response.data.users));
  }

  getFilteredUsers(text: string) {
    return this.apollo
      .watchQuery<{ filteredUsers: User[] }>({
        query: GET_FILTERED_USERS,
        variables: {
          text,
        },
      })
      .valueChanges.pipe(map(response => response.data.filteredUsers));
  }

  getUsersFromProject(projectId: string) {
    return this.apollo
      .watchQuery<{ usersFromProject: { user: User }[] }>({
        query: GET_USERS_FROM_PROJECT,
        variables: {
          projectId,
        },
      })
      .valueChanges.pipe(map(response => response.data.usersFromProject));
  }

  getUsersFromTask(taskId: string) {
    return this.apollo
      .watchQuery<{ usersFromTask: { user: User }[] }>({
        query: GET_USERS_FROM_TASK,
        variables: {
          taskId,
        },
      })
      .valueChanges.pipe(map(response => response.data.usersFromTask));
  }

  getTasksFromUser(userId: string) {
    return this.apollo
      .watchQuery<{ getTasksFromUser: { task: Task }[] }>({
        query: GET_TASKS_FROM_USER,
        variables: {
          userId,
        },
      })
      .valueChanges.pipe(map(response => response.data.getTasksFromUser));
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
            projectId,
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
          query: GET_USERS_AND_TASKS,
        },
        {
          query: GET_USERS_FROM_TASK,
          variables: { taskId },
        },
        {
          query: GET_TASKS_FROM_USER,
          variables: { userId },
        },
      ],
    });
  }

  removeUserFromProject(projectId: string, userId: string) {
    this.getTasksFromUser(userId)
      .pipe(take(1))
      .subscribe(data => {
        const taskIds = data.map(data => data.task.id);

        taskIds.forEach(taskId =>
          this.removeUserFromTask(taskId, userId).pipe(take(1)).subscribe()
        );
      });

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
          query: GET_USERS_AND_TASKS,
        },
        {
          query: GET_USERS_FROM_TASK,
          variables: {
            taskId,
          },
        },
        {
          query: GET_TASKS_FROM_USER,
          variables: {
            userId,
          },
        },
      ],
    });
  }

  addProject(name: string) {
    return this.supabase.session$.pipe(
      map(session => session?.user.id ?? ''),
      switchMap(userId =>
        this.apollo.mutate<{ addProject: Project }>({
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
    return this.apollo
      .mutate<{ addBoard: Board }>({
        mutation: ADD_BOARD,
        variables: { name, projectId },
        refetchQueries: [
          {
            query: GET_PROJECTS,
          },
        ],
      })
      .pipe(take(1));
  }

  addColumn(name: string, dotColor: string, boardId: string) {
    return this.apollo
      .mutate({
        mutation: ADD_COLUMN,
        variables: { name, boardId, dotColor },
        refetchQueries: [
          {
            query: GET_PROJECTS,
          },
        ],
      })
      .pipe(take(1));
  }

  addTask(task: Partial<Task>, columnId: string) {
    return this.apollo
      .mutate<{ addTask: { id: string } }>({
        mutation: ADD_TASK,
        variables: {
          title: task.title,
          description: task.description,
          columnId,
          tagNames: task.tagNames,
          tagFontColors: task.tagFontColors,
          tagBackgroundColors: task.tagBackgroundColors,
        },
        refetchQueries: [
          {
            query: GET_PROJECTS,
          },
        ],
      })
      .pipe(take(1));
  }

  addSubtask(name: string, isFinished: boolean, taskId: string) {
    return this.apollo
      .mutate<{ addSubtask: { id: string; name: string } }>({
        mutation: ADD_SUBTASK,
        variables: { name, isFinished, taskId },
        refetchQueries: [
          {
            query: GET_PROJECTS,
          },
        ],
      })
      .pipe(take(1));
  }

  addUser(name: string, email: string, id: string) {
    return this.apollo
      .mutate({
        mutation: ADD_USER,
        variables: { name, email, id },
      })
      .pipe(take(1));
  }

  editProject(id: string, name: string) {
    return this.supabase.session$.pipe(
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
    return this.supabase.session$.pipe(
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
    return this.supabase.session$.pipe(
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
    return this.apollo
      .mutate<{
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
          },
        ],
      })
      .pipe(take(1));
  }

  editSubtask(id: string, name: string) {
    return this.supabase.session$.pipe(
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
    if (type === 'project') mutation = REMOVE_PROJECT;
    if (type === 'board') mutation = REMOVE_BOARD;
    if (type === 'column') mutation = REMOVE_COLUMN;
    if (type === 'task') mutation = REMOVE_TASK;
    if (type === 'subtask') mutation = REMOVE_SUBTASK;

    return this.supabase.session$.pipe(
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
      )
    );
  }

  updateCompletionStateOfSubtask(id: string, state: boolean) {
    return this.supabase.session$.pipe(
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
    return this.supabase.session$.pipe(
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

  changeColumnOrder(
    currOrder: number,
    prevOrder: number,
    currColumnId: string,
    prevColumnId: string
  ) {
    return this.supabase.session$.pipe(
      map(session => session?.user.id ?? ''),
      switchMap(userId =>
        this.apollo.mutate({
          mutation: CHANGE_COLUMN_ORDER,
          variables: {
            currOrder,
            prevOrder,
            currColumnId,
            prevColumnId,
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
    );
  }

  updateUserName(id: string, name: string) {
    return this.apollo.mutate({
      mutation: UPDATE_USER_NAME,
      variables: {
        id,
        name,
      },
      refetchQueries: [
        {
          query: GET_USERS,
        },
      ],
    });
  }
}
