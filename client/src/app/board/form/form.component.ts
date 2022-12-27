import { Component, OnInit } from '@angular/core';
import { FormService } from './form.service';
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { FormType } from '../../types';
import { ApolloService } from '../apollo.service';
import { tap } from 'rxjs';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  typeOfForm!: FormType;
  isEditing!: boolean;
  isSubmitted = false;

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
        this.formBuilder.group({
          name: this.formBuilder.control('', [Validators.required]),
          fontColor: this.formBuilder.control('#000000'),
          backgroundColor: this.formBuilder.control('#e8fe93'),
        }),
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
        this.formService.editingTask?.tagNames.map((tag: string) =>
          this.formBuilder.control(tag, [Validators.required])
        ) ?? []
      ),
    }),
    editSubtask: this.formBuilder.group({
      name: [this.formService.editingSubtask?.name, [Validators.required]],
    }),
  });

  constructor(
    private formService: FormService,
    private apollo: ApolloService,
    private formBuilder: FormBuilder,
    private board: BoardService
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
    const control = new FormGroup({
      name: this.formBuilder.control('', [Validators.required]),
      fontColor: this.formBuilder.control('#000000'),
      backgroundColor: this.formBuilder.control('#e8fe93'),
    });
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

    if (this.isEditing) {
      if (
        this.typeOfForm === 'project' &&
        this.boardForm.controls.editProject.valid
      ) {
        const projectId = this.formService.editingProject?.id ?? '';
        const projectName = this.boardForm.value.editProject?.name ?? '';

        this.apollo.editProject(projectId, projectName).subscribe();
      }
      if (
        this.typeOfForm === 'board' &&
        this.boardForm.controls.editBoard.valid
      ) {
        const boardId = this.formService.editingBoard?.id ?? '';
        const boardName = this.boardForm.value.editBoard?.name ?? '';

        this.apollo.editBoard(boardId, boardName).subscribe();
      }
      if (
        this.typeOfForm === 'column' &&
        this.boardForm.controls.editColumn.valid
      ) {
        const columnId = this.formService.editingColumn?.id ?? '';
        const columnName = this.boardForm.value.editColumn?.name ?? '';

        this.apollo.editColumn(columnId, columnName).subscribe();
      }
      if (
        this.typeOfForm === 'task' &&
        this.boardForm.controls.editTask.valid
      ) {
        const taskId = this.formService.editingTask?.id ?? '';
        const taskTitle = this.boardForm.value.editTask?.title ?? '';
        const taskDescription =
          this.boardForm.value.editTask?.description ?? '';
        const taskTags = this.editedTags.value ?? [];

        console.log(this.tags.value);

        this.apollo
          .editTask(taskId, taskTitle, taskDescription, taskTags)
          .subscribe();
      }
      if (
        this.typeOfForm === 'subtask' &&
        this.boardForm.controls.editSubtask.valid
      ) {
        const subtaskId = this.formService.editingSubtask?.id ?? '';
        const subtaskName = this.boardForm.value.editSubtask?.name ?? '';

        this.apollo.editSubtask(subtaskId, subtaskName).subscribe();
      }
    } else {
      if (
        this.typeOfForm === 'project' &&
        this.boardForm.controls.project.valid
      ) {
        this.apollo
          .addProject(this.boardForm.value.project?.name ?? '')
          .subscribe();
      }

      if (this.typeOfForm === 'board' && this.boardForm.controls.board.valid) {
        const boardName = this.boardForm.value.board?.name ?? '';
        this.apollo
          .addBoard(boardName)
          .pipe(
            tap(data => {
              if (data.data?.addBoard) {
                this.board.onChangeSelectedBoard(data.data.addBoard);
              }
            })
          )
          .subscribe();
      }

      if (
        this.typeOfForm === 'column' &&
        this.boardForm.controls.column.valid
      ) {
        const columnName = this.boardForm.value.column?.name ?? '';
        this.apollo.addColumn(columnName).subscribe();
      }

      if (this.typeOfForm === 'task' && this.boardForm.controls.task.valid) {
        const taskTitle = this.boardForm.value.task?.title ?? '';
        const taskDescription = this.boardForm.value.task?.description ?? '';
        type Tag = {
          name: string;
          fontColor: string;
          backgroundColor: string;
        };
        const taskTagNames = this.tags.value.map((tag: Tag) => tag.name);

        const taskTagFontColors = this.tags.value.map(
          (tag: Tag) => tag.fontColor
        );

        const taskTagBackgronudColors = this.tags.value.map(
          (tag: Tag) => tag.backgroundColor
        );

        this.apollo
          .addTask(
            taskTitle,
            taskDescription,
            taskTagNames,
            taskTagFontColors,
            taskTagBackgronudColors
          )
          .subscribe();
      }

      if (
        this.typeOfForm === 'subtask' &&
        this.boardForm.controls.subtask.valid
      ) {
        const subtaskName = this.boardForm.value.subtask?.name ?? '';

        this.apollo.addSubtask(subtaskName, false).subscribe();
      }
    }

    this.formService.isEditing = false;
    this.formService.onChangeFormVisibility();
  }
}
