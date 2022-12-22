import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  ADD_BOARD,
  ADD_COLUMN,
  ADD_PROJECT,
  ADD_SUBTASK,
  ADD_TASK,
  CHANGE_COMPLETION_STATE,
  CHANGE_COLUMN,
  EDIT_BOARD,
  EDIT_COLUMN,
  EDIT_PROJECT,
  EDIT_SUBTASK,
  EDIT_TASK,
  GET_PROJECTS,
  REMOVE_BOARD,
  REMOVE_COLUMN,
  REMOVE_PROJECT,
  REMOVE_SUBTASK,
  REMOVE_TASK,
} from '../graphql.schema';
import { SupabaseService } from '../supabase.service';
import { map, Observable } from 'rxjs';
import { Board, FormType, Project, Task } from '../types';
import { BoardService } from './board.service';

@Injectable({
  providedIn: 'root',
})
export class ApolloService {
  private readonly userId!: string;

  constructor(
    private apollo: Apollo,
    private supabase: SupabaseService,
    private board: BoardService
  ) {
    this.userId = this.supabase.getUserId;
  }

  getProjects(): Observable<{ projects: Project[] }> {
    return this.apollo
      .watchQuery<{ projects: Project[] }>({
        query: GET_PROJECTS,
        variables: { userId: this.userId },
      })
      .valueChanges.pipe(map(({ data }) => data));
  }

  addProject(name: string) {
    return this.apollo.mutate<{ addProject: { id: string; name: string } }>({
      mutation: ADD_PROJECT,
      variables: { name, userId: this.userId },
      refetchQueries: [
        {
          query: GET_PROJECTS,
          variables: {
            userId: this.userId,
          },
        },
      ],
    });
  }

  addBoard(name: string) {
    const projectId = this.board.selectedProjectId.value;
    return this.apollo.mutate<{ addBoard: Board }>({
      mutation: ADD_BOARD,
      variables: { name, projectId },
      refetchQueries: [
        {
          query: GET_PROJECTS,
          variables: {
            userId: this.userId,
          },
        },
      ],
    });
  }

  addColumn(name: string) {
    const boardId = this.board.selectedBoard.value?.id ?? '';

    return this.apollo.mutate<{ addColumn: { id: string; name: string } }>({
      mutation: ADD_COLUMN,
      variables: { name, boardId },
      refetchQueries: [
        {
          query: GET_PROJECTS,
          variables: {
            userId: this.userId,
          },
        },
      ],
    });
  }

  addTask(title: string, description: string, tags: string[]) {
    const columnId = this.board.selectedColumnId.value;

    return this.apollo.mutate<{ addTask: { id: string } }>({
      mutation: ADD_TASK,
      variables: { title, description, columnId, tags },
      refetchQueries: [
        {
          query: GET_PROJECTS,
          variables: {
            userId: this.userId,
          },
        },
      ],
    });
  }

  addSubtask(name: string, isFinished: boolean) {
    const taskId = this.board.selectedTaskId.value;

    return this.apollo.mutate<{ addSubtask: { id: string; name: string } }>({
      mutation: ADD_SUBTASK,
      variables: { name, isFinished, taskId },
      refetchQueries: [
        {
          query: GET_PROJECTS,
          variables: {
            userId: this.userId,
          },
        },
      ],
    });
  }

  editProject(id: string, name: string) {
    return this.apollo.mutate<{ editProject: { id: string; name: string } }>({
      mutation: EDIT_PROJECT,
      variables: { id, name },
      refetchQueries: [
        {
          query: GET_PROJECTS,
          variables: {
            userId: this.userId,
          },
        },
      ],
    });
  }

  editBoard(id: string, name: string) {
    return this.apollo.mutate<{ editBoard: { id: string; name: string } }>({
      mutation: EDIT_BOARD,
      variables: { id, name },
      refetchQueries: [
        {
          query: GET_PROJECTS,
          variables: {
            userId: this.userId,
          },
        },
      ],
    });
  }

  editColumn(id: string, name: string) {
    return this.apollo.mutate<{ editColumn: { id: string; name: string } }>({
      mutation: EDIT_COLUMN,
      variables: { id, name },
      refetchQueries: [
        {
          query: GET_PROJECTS,
          variables: {
            userId: this.userId,
          },
        },
      ],
    });
  }

  editTask(id: string, title: string, description: string, tags: string[]) {
    return this.apollo.mutate<{
      editTask: {
        id: string;
        title: string;
        description: string;
        tags: string[];
      };
    }>({
      mutation: EDIT_TASK,
      variables: { id, title, description, tags },
      refetchQueries: [
        {
          query: GET_PROJECTS,
          variables: {
            userId: this.userId,
          },
        },
      ],
    });
  }

  editSubtask(id: string, name: string) {
    return this.apollo.mutate<{
      editSubtask: { id: string; name: string };
    }>({
      mutation: EDIT_SUBTASK,
      variables: { id, name },
      refetchQueries: [
        {
          query: GET_PROJECTS,
          variables: {
            userId: this.userId,
          },
        },
      ],
    });
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

    return this.apollo.mutate({
      mutation,
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: GET_PROJECTS,
          variables: {
            userId: this.userId,
          },
        },
      ],
    });
  }

  updateCompletionStateOfSubtask(id: string, state: boolean) {
    return this.apollo.mutate({
      mutation: CHANGE_COMPLETION_STATE,
      variables: { id, state },
      refetchQueries: [
        {
          query: GET_PROJECTS,
          variables: {
            userId: this.userId,
          },
        },
      ],
    });
  }

  changeColumn(columnId: string, taskId: string) {
    return this.apollo.mutate({
      mutation: CHANGE_COLUMN,
      variables: { columnId, taskId },
      refetchQueries: [
        {
          query: GET_PROJECTS,
          variables: {
            userId: this.userId,
          },
        },
      ],
    });
  }
}
