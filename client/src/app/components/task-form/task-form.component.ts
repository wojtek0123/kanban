import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form/form.service';
import { ApolloService } from '../../services/apollo/apollo.service';
import { FormArray, FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { ToastService } from '../../services/toast/toast.service';
import { Column } from '../../models/column.model';
import { AutoFocusDirective } from '../../directives/auto-focus.directive';
import { NgIf, NgFor, NgOptimizedImage, AsyncPipe } from '@angular/common';
import { Task } from '../../models/task.model';

type Tag = {
  name: string;
  fontColor: string;
  backgroundColor: string;
};

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, AutoFocusDirective, NgFor, NgOptimizedImage, AsyncPipe],
})
export class TaskFormComponent implements OnInit {
  isEditing$!: Observable<boolean>;
  submitted = false;
  selectColumn$ = new Observable<boolean | undefined>();
  columns$!: Observable<Column[] | undefined>;
  selectedColumn: string | undefined = undefined;

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
        [Validators.maxLength(3)]
      ),
    }),
    edit: this.formBuilder.group({
      title: [this.formService.getEditingTask?.title, [Validators.required]],
      description: [this.formService.getEditingTask?.description, [Validators.required]],
      tags: this.formBuilder.array(this.fillEditTags() ?? [], [Validators.maxLength(3)]),
    }),
  });

  constructor(
    private formService: FormService,
    private apollo: ApolloService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.isEditing$ = this.formService.isEditing$;
    this.selectColumn$ = this.formService.selectColumn$;
    this.columns$ = this.formService.getColumnsFormBoard();
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
    return this.form.get('add')?.get('tags');
  }

  get editTags() {
    return this.form.get('edit')?.get('tags');
  }

  fillEditTags() {
    const tags = [];

    const names = this.formService.getEditingTask?.tagNames;
    const fontColors = this.formService.getEditingTask?.tagFontColors;
    const backgroundColors = this.formService.getEditingTask?.tagBackgroundColors;

    if (!names || !fontColors || !backgroundColors) {
      return;
    }

    for (let i = 0; i < names.length; i++) {
      const tag = {
        name: names[i],
        fontColor: fontColors[i],
        backgroundColor: backgroundColors[i],
      } satisfies Tag;

      tags.push(this.createTag(tag));
    }

    return tags;
  }

  addTag(groupName: string) {
    (<FormArray>this.form.get(groupName)?.get('tags')).push(this.createTag());
  }

  createTag(control?: Tag) {
    return new FormGroup({
      name: this.formBuilder.control(control?.name ?? '', [Validators.required]),
      fontColor: this.formBuilder.control(control?.fontColor ?? '#000000'),
      backgroundColor: this.formBuilder.control(control?.backgroundColor ?? '#e8fe93'),
    });
  }

  removeTagNew(groupName: string, index: number) {
    const tags = <FormArray>this.form.get(groupName)?.get('tags');

    if (index <= tags.length) {
      tags.removeAt(index);
    }
  }

  changeSelectedColumn(event: Event) {
    this.selectedColumn = (event.target as HTMLSelectElement).value;
  }

  onEdit() {
    this.submitted = true;

    if (this.getFormControls.edit.valid) {
      const id = this.formService.getEditingTask?.id ?? '';
      const title = this.form.value.edit?.title ?? '';
      const description = this.form.value.edit?.description ?? '';

      const tags = this.form.value.edit?.tags;
      const tagNames = tags?.map(tag => tag.name ?? '') ?? [];
      const tagFontColors = tags?.map(tag => tag.fontColor ?? '') ?? [];
      const tagBackgroundColors = tags?.map(tag => tag.backgroundColor ?? '') ?? [];

      this.apollo
        .editTask(id, title, description, tagNames, tagFontColors, tagBackgroundColors)
        .pipe(
          catchError(async error => {
            this.toastService.showToast('warning', `Couldn't update this task`);
            throw new Error(error);
          }),
          take(1)
        )
        .subscribe(() => {
          this.toastService.showToast('confirm', 'Successfully updated this task');
          setTimeout(() => {
            this.formService.onChangeEditingTask();
          }, 0);
        });

      this.formService.onChangeFormVisibility();
    }
  }

  onAdd() {
    this.submitted = true;

    if (this.getFormControls.add.valid) {
      const title = this.form.value.add?.title ?? '';
      const description = this.form.value.add?.description ?? '';

      const tags = this.form.value.edit?.tags;
      const tagNames = tags?.map(tag => tag.name ?? '') ?? [];
      const tagFontColors = tags?.map(tag => tag.fontColor ?? '') ?? [];
      const tagBackgroundColors = tags?.map(tag => tag.backgroundColor ?? '') ?? [];

      // TODO: add task interface
      const task: Partial<Task> = {
        title,
        description,
        tagNames,
        tagFontColors,
        tagBackgroundColors,
      };

      if (this.selectedColumn) {
        this.apollo
          .addTask(task, this.selectedColumn)
          .pipe(
            catchError(async error => {
              this.toastService.showToast('warning', `Couldn't add a new task`);
              throw new Error(error);
            }),
            take(1)
          )
          .subscribe(() => this.toastService.showToast('confirm', 'Successfully added a new task'));
        this.formService.onChangeFormVisibility();
        return;
      }

      this.formService.parentId$
        .pipe(
          switchMap(parentId => this.apollo.addTask(task, parentId)),
          catchError(async error => {
            this.toastService.showToast('warning', `Couldn't add a new task`);
            throw new Error(error);
          }),
          take(1)
        )
        .subscribe(() => this.toastService.showToast('confirm', 'Successfully added a new task'));

      this.formService.onChangeFormVisibility();
    }
  }

  columnTrackBy(_index: number, column: Column) {
    return column.id;
  }
}
