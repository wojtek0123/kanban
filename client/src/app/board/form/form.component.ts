import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormService, FormType } from './form.service';
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Apollo } from 'apollo-angular';
import {
  GET_PROJECTS,
  ADD_BOARD,
  ADD_COLUMN,
  ADD_TASK,
  EDIT_BOARD,
  EDIT_COLUMN,
  EDIT_TASK,
  ADD_SUBTASK,
  EDIT_SUBTASK,
  ADD_PROJECT,
  EDIT_PROJECT,
} from 'src/app/graphql.schema';
import { Board } from '../board.component';
import { BoardService } from '../board.service';
import { SupabaseService } from 'src/app/supabase.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  typeOfForm!: FormType;
  isEditing!: boolean;
  isSubmitted = false;
  private subscriptions: Subscription[] = [];

  boardForm = this.formBuilder.group({
    project: this.formBuilder.group({
      name: ['', [Validators.required]],
    }),
    board: this.formBuilder.group({
      name: ['', [Validators.required]],
    }),
    column: this.formBuilder.group({
      name: ['', [Validators.required]],
    }),
    task: this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      tags: this.formBuilder.array([
        this.formBuilder.control('', [Validators.required]),
      ]),
    }),
    subtask: this.formBuilder.group({
      name: ['', [Validators.required]],
    }),
    editProject: this.formBuilder.group({
      name: [this.formService.editingProject?.name, [Validators.required]],
    }),
    editBoard: this.formBuilder.group({
      name: [this.formService.editingBoard?.name, [Validators.required]],
    }),
    editColumn: this.formBuilder.group({
      name: [this.formService.editingColumn?.name, [Validators.required]],
    }),
    editTask: this.formBuilder.group({
      title: [this.formService.editingTask?.title, [Validators.required]],
      description: [
        this.formService.editingTask?.description,
        [Validators.required],
      ],
      tags: this.formBuilder.array(
        this.formService.editingTask?.tags.map(tag =>
          this.formBuilder.control(tag)
        ) ?? []
      ),
    }),
    editSubtask: this.formBuilder.group({
      name: [this.formService.editingSubtask?.name, [Validators.required]],
    }),
  });

  constructor(
    private formService: FormService,
    private apollo: Apollo,
    private formBuilder: FormBuilder,
    private boardService: BoardService,
    private supabase: SupabaseService
  ) {}

  ngOnInit(): void {
    this.typeOfForm = this.formService.typeOfForm;
    this.isEditing = this.formService.isEditing;
  }

  onClose() {
    this.formService.onChangeFormVisibility();
    this.formService.onLeaveEditingMode();
  }

  addTag(groupName: string) {
    const control = new FormControl('', Validators.required);
    (<FormArray>this.boardForm.get(groupName)?.get('tags')).push(control);
  }

  removeTag(groupName: string) {
    (<FormArray>this.boardForm.get(groupName)?.get('tags')).removeAt(-1);
  }

  get tags() {
    return this.boardForm.get('task')?.get('tags') as FormArray;
  }

  get editedTags() {
    return this.boardForm.get('editTask')?.get('tags') as FormArray;
  }

  get getControls() {
    return this.boardForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    let validCounter = 0;
    for (const controlName of Object.keys(this.boardForm.controls)) {
      // @ts-ignore
      const control = this.boardForm.controls[controlName].valid;
      if (control) {
        validCounter++;
      }
    }
    if (validCounter === 0) {
      return;
    }

    if (
      this.typeOfForm === 'project' &&
      !this.isEditing &&
      this.boardForm.controls.project.valid
    ) {
      const mutationSubscription = this.apollo
        .mutate({
          mutation: ADD_PROJECT,
          variables: {
            name: this.boardForm.value.project?.name ?? '',
            userId: this.supabase.getUserId,
          },
          refetchQueries: [
            {
              query: GET_PROJECTS,
              variables: {
                userId: this.supabase.getUserId,
              },
            },
          ],
        })
        .subscribe();
      this.subscriptions = [...this.subscriptions, mutationSubscription];
    }

    if (
      this.typeOfForm === 'board' &&
      !this.isEditing &&
      this.boardForm.controls.board.valid
    ) {
      const mutationSubscription = this.apollo
        .mutate<{ AddBoard: Board }>({
          mutation: ADD_BOARD,
          variables: {
            name: this.boardForm.value.board?.name,
            projectId: this.boardService.selectedProjectId.value,
          },
          refetchQueries: [
            {
              query: GET_PROJECTS,
              variables: {
                userId: this.supabase.getUserId,
              },
            },
          ],
        })
        .subscribe();

      this.subscriptions = [...this.subscriptions, mutationSubscription];
    }
    if (
      this.typeOfForm === 'column' &&
      !this.isEditing &&
      this.boardForm.controls.column.valid
    ) {
      const mutationSubscription = this.apollo
        .mutate({
          mutation: ADD_COLUMN,
          variables: {
            name: this.boardForm.value.column?.name,
            boardId: this.boardService.selectedBoardId.value,
          },
          refetchQueries: [
            {
              query: GET_PROJECTS,
              variables: {
                userId: this.supabase.getUserId,
              },
            },
          ],
        })
        .subscribe();
      this.subscriptions = [...this.subscriptions, mutationSubscription];
    }
    if (
      this.typeOfForm === 'task' &&
      !this.isEditing &&
      this.boardForm.controls.task.valid
    ) {
      const mutationSubscription = this.apollo
        .mutate({
          mutation: ADD_TASK,
          variables: {
            title: this.boardForm.value.task?.title,
            description: this.boardForm.value.task?.description,
            columnId: this.boardService.selectedColumnId.value,
            tags: this.tags.value,
          },
          refetchQueries: [
            {
              query: GET_PROJECTS,
              variables: {
                userId: this.supabase.getUserId,
              },
            },
          ],
        })
        .subscribe();
      this.subscriptions = [...this.subscriptions, mutationSubscription];
    }
    if (
      this.typeOfForm === 'subtask' &&
      !this.isEditing &&
      this.boardForm.controls.subtask.valid
    ) {
      const mutationSubscription = this.apollo
        .mutate({
          mutation: ADD_SUBTASK,
          variables: {
            name: this.boardForm.value.subtask?.name,
            isFinished: false,
            taskId: this.boardService.selectedTaskId.value,
          },
          refetchQueries: [
            {
              query: GET_PROJECTS,
              variables: {
                userId: this.supabase.getUserId,
              },
            },
          ],
        })
        .subscribe();
      this.subscriptions = [...this.subscriptions, mutationSubscription];
    }

    if (
      this.typeOfForm === 'project' &&
      this.isEditing &&
      this.boardForm.controls.editProject.valid
    ) {
      const mutationSubscription = this.apollo
        .mutate({
          mutation: EDIT_PROJECT,
          variables: {
            id: this.formService.editingProject?.id,
            name: this.boardForm.value.editProject?.name,
          },
          refetchQueries: [
            {
              query: GET_PROJECTS,
              variables: {
                userId: this.supabase.getUserId,
              },
            },
          ],
        })
        .subscribe();
      this.subscriptions = [...this.subscriptions, mutationSubscription];
    }
    if (
      this.typeOfForm === 'board' &&
      this.isEditing &&
      this.boardForm.controls.editBoard.valid
    ) {
      const mutationSubscription = this.apollo
        .mutate({
          mutation: EDIT_BOARD,
          variables: {
            id: this.formService.editingBoard?.id,
            name: this.boardForm.value.editBoard?.name,
          },
          refetchQueries: [
            {
              query: GET_PROJECTS,
              variables: {
                userId: this.supabase.getUserId,
              },
            },
          ],
        })
        .subscribe();
      this.subscriptions = [...this.subscriptions, mutationSubscription];
    }
    if (
      this.typeOfForm === 'column' &&
      this.isEditing &&
      this.boardForm.controls.editColumn.valid
    ) {
      const mutationSubscription = this.apollo
        .mutate({
          mutation: EDIT_COLUMN,
          variables: {
            id: this.formService.editingColumn?.id,
            name: this.boardForm.value.editColumn?.name,
          },
          refetchQueries: [
            {
              query: GET_PROJECTS,
              variables: {
                userId: this.supabase.getUserId,
              },
            },
          ],
        })
        .subscribe();
      this.subscriptions = [...this.subscriptions, mutationSubscription];
    }
    if (
      this.typeOfForm === 'task' &&
      this.isEditing &&
      this.boardForm.controls.editTask.valid
    ) {
      const mutationSubscription = this.apollo
        .mutate({
          mutation: EDIT_TASK,
          variables: {
            id: this.formService.editingTask?.id,
            title: this.boardForm.value.editTask?.title,
            description: this.boardForm.value.editTask?.description,
            tags: this.editedTags.value,
          },
          refetchQueries: [
            {
              query: GET_PROJECTS,
              variables: {
                userId: this.supabase.getUserId,
              },
            },
          ],
        })
        .subscribe();
      this.subscriptions = [...this.subscriptions, mutationSubscription];
    }
    if (
      this.typeOfForm === 'subtask' &&
      this.isEditing &&
      this.boardForm.controls.subtask.valid
    ) {
      const mutationSubscription = this.apollo
        .mutate({
          mutation: EDIT_SUBTASK,
          variables: {
            id: this.formService.editingSubtask?.id,
            name: this.boardForm.value.editSubtask?.name,
            isFinished: false,
          },
          refetchQueries: [
            {
              query: GET_PROJECTS,
              variables: {
                userId: this.supabase.getUserId,
              },
            },
          ],
        })
        .subscribe();
      this.subscriptions = [...this.subscriptions, mutationSubscription];
    }
    this.formService.isEditing = false;
    this.formService.onChangeFormVisibility();
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      if (sub && sub.unsubscribe) {
        sub.unsubscribe();
      }
    }
  }
}
