import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

import { FormService } from '../../services/form/form.service';
import { ApolloService } from '../../services/apollo/apollo.service';
import { ToastService } from '../../services/toast/toast.service';
import { AutoFocusDirective } from '../../directives/auto-focus.directive';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    AutoFocusDirective,
    AsyncPipe,
  ],
})
export class ColumnFormComponent implements OnInit {
  isEditing$!: Observable<boolean>;
  submitted = false;

  form = this.formBuilder.group({
    add: this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      dotColor: this.formBuilder.control('#ffffff'),
    }),
    edit: this.formBuilder.group({
      name: this.formBuilder.control(this.formService.getEditingColumn?.name, [
        Validators.required,
      ]),
      dotColor: this.formBuilder.control(
        this.formService.getEditingColumn?.dotColor
      ),
    }),
  });

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private apollo: ApolloService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.isEditing$ = this.formService.isEditing$;
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

  onEdit() {
    this.submitted = true;

    if (this.getFormControls.edit.valid) {
      const id = this.formService.getEditingColumn?.id ?? '';
      const name = this.form.value.edit?.name ?? '';
      const dotColor = this.form.value.edit?.dotColor ?? '';

      this.apollo
        .editColumn(id, name, dotColor)
        .pipe(
          catchError(async error => {
            this.toastService.showToast(
              'warning',
              `Couldn't update this column`
            );
            throw new Error(error);
          })
        )
        .subscribe(() =>
          this.toastService.showToast(
            'confirm',
            'Successfully update this column'
          )
        );

      this.formService.onChangeFormVisibility();
    }
  }

  onAdd() {
    this.submitted = true;

    if (this.getFormControls.add.valid) {
      const name = this.form.value.add?.name ?? '';
      const dotColor = this.form.value.add?.dotColor ?? '';

      this.formService.parentId$
        .pipe(
          switchMap(parentId =>
            this.apollo.addColumn(name, dotColor, parentId)
          ),
          catchError(async error => {
            this.toastService.showToast('warning', `Couldn't add a new column`);
            throw new Error(error);
          }),
          take(1)
        )
        .subscribe(() =>
          this.toastService.showToast(
            'confirm',
            'Successfully added a new column'
          )
        );
      this.formService.onChangeFormVisibility();
    }
  }
}
