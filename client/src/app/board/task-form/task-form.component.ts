import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { ApolloService } from '../../services/apollo.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastService } from '../../services/toast.service';

type Tag = {
  name: string;
  fontColor: string;
  backgroundColor: string;
};

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  isEditing$!: Observable<boolean>;
  submitted = false;

  form = this.formBuilder.group({
    add: this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      tags: this.formBuilder.array(
        [
          this.formBuilder.group({
            name: this.formBuilder.control('', [Validators.required]),
            fontColor: this.formBuilder.control('#000000'),
            backgroundColor: this.formBuilder.control('#e8fe93'),
          }),
        ],
        [this.maxLength(3)]
      ),
    }),
    edit: this.formBuilder.group({
      title: [this.formService.getEditingTask?.title, [Validators.required]],
      description: [
        this.formService.getEditingTask?.description,
        [Validators.required],
      ],
      tags: this.formBuilder.array(this.fillEditTags() ?? [], [
        this.maxLength(3),
      ]),
    }),
  });

  constructor(
    private formService: FormService,
    private apollo: ApolloService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.isEditing$ = this.formService.getIsEditing;
  }

  maxLength(max: number): ValidatorFn | any {
    return (control: AbstractControl[]) => {
      if (!(control instanceof FormArray)) return;
      return control.length > max ? { maxLength: true } : null;
    };
  }

  get getAddControls() {
    return this.form.controls.add.controls;
  }

  get getEditControls() {
    return this.form.controls.edit.controls;
  }

  get getFormControls() {
    return this.form.controls;
  }

  get addTags() {
    return this.form.get('add')?.get('tags') as FormArray;
  }

  get editTags() {
    return this.form.get('edit')?.get('tags') as FormArray;
  }

  fillEditTags() {
    const tags = [];

    const names = this.formService.getEditingTask?.tagNames;
    const fontColors = this.formService.getEditingTask?.tagFontColors;
    const backgroundColors =
      this.formService.getEditingTask?.tagBackgroundColors;

    if (!names || !fontColors || !backgroundColors) {
      return;
    }

    for (let i = 0; i < names.length; i++) {
      const group = new FormGroup({
        name: this.formBuilder.control(names[i], [Validators.required]),
        fontColor: this.formBuilder.control(fontColors[i]),
        backgroundColor: this.formBuilder.control(backgroundColors[i]),
      });
      tags.push(group);
    }

    return tags;
  }

  addTag(groupName: string) {
    const control = new FormGroup({
      name: this.formBuilder.control('', [Validators.required]),
      fontColor: this.formBuilder.control('#000000'),
      backgroundColor: this.formBuilder.control('#e8fe93'),
    });
    (<FormArray>this.form.get(groupName)?.get('tags')).push(control);
  }

  removeTag(groupName: string) {
    (<FormArray>this.form.get(groupName)?.get('tags')).removeAt(-1);
  }

  onSubmit() {
    this.submitted = true;

    if (this.getFormControls.edit.valid) {
      const id = this.formService.getEditingTask?.id ?? '';
      const title = this.form.value.edit?.title ?? '';
      const description = this.form.value.edit?.description ?? '';

      const tagNames = this.editTags.value.map((tag: Tag) => tag.name);
      const tagFontColors = this.editTags.value.map(
        (tag: Tag) => tag.fontColor
      );
      const tagBackgroundColors = this.editTags.value.map(
        (tag: Tag) => tag.backgroundColor
      );

      this.apollo
        .editTask(
          id,
          title,
          description,
          tagNames,
          tagFontColors,
          tagBackgroundColors
        )
        .pipe(
          catchError(async error => {
            this.toastService.showToast('warning', `Couldn't update this task`);
            throw new Error(error);
          })
        )
        .subscribe(() =>
          this.toastService.showToast(
            'confirm',
            'Successfully updated this task'
          )
        );
    }
    if (this.getFormControls.add.valid) {
      const title = this.form.value.add?.title ?? '';
      const description = this.form.value.add?.description ?? '';

      const tagNames = this.addTags.value.map((tag: Tag) => tag.name);
      const tagFontColors = this.addTags.value.map((tag: Tag) => tag.fontColor);
      const tagBackgroundColors = this.addTags.value.map(
        (tag: Tag) => tag.backgroundColor
      );

      this.apollo
        .addTask(
          title,
          description,
          tagNames,
          tagFontColors,
          tagBackgroundColors
        )
        .pipe(
          catchError(async error => {
            this.toastService.showToast('warning', `Couldn't add a new task`);
            throw new Error(error);
          })
        )
        .subscribe(() =>
          this.toastService.showToast(
            'confirm',
            'Successfully added a new task'
          )
        );
    }
    if (this.getFormControls.add.invalid && this.getFormControls.edit.invalid) {
      return;
    }

    this.formService.onChangeFormVisibility();
  }
}
