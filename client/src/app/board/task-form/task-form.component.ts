import { Component, OnInit } from '@angular/core';
import { FormService } from '../form/form.service';
import { ApolloService } from '../apollo.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  isEditing!: boolean;

  form = this.formBuilder.group({
    add: this.formBuilder.group({
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
    edit: this.formBuilder.group({
      title: [this.formService.editingTask?.title, [Validators.required]],
      description: [
        this.formService.editingTask?.description,
        [Validators.required],
      ],
      tags: this.formBuilder.array(this.fillEditTags() ?? []),
    }),
  });

  constructor(
    private formService: FormService,
    private apollo: ApolloService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isEditing = this.formService.isEditing;
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

    const names = this.formService.editingTask?.tagNames;
    const fontColors = this.formService.editingTask?.tagFontColors;
    const backgroundColors = this.formService.editingTask?.tagBackgroundColors;

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
    if (this.isEditing && this.getFormControls.edit.valid) {
      const id = this.formService.editingTask?.id ?? '';
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
        .subscribe();
    }

    if (!this.isEditing && this.getFormControls.add.valid) {
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
        .subscribe();
    }

    this.formService.isEditing = false;
    this.formService.onChangeFormVisibility();
  }
}
