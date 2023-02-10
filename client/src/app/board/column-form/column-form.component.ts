import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { ApolloService } from '../../services/apollo.service';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: [],
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
    this.isEditing$ = this.formService.getIsEditing;
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

  onSubmit() {
    this.submitted = true;

    if (this.getFormControls.edit.valid) {
      const id = this.formService.getEditingColumn?.id ?? '';
      const name = this.form.value.edit?.name ?? '';
      const dotColor = this.form.value.edit?.dotColor ?? '';

      this.apollo
        .editColumn(id, name, dotColor)
        .pipe(
          catchError(async error => {
            this.toastService.showWarningToast('update', 'column');
            throw new Error(error);
          })
        )
        .subscribe(() =>
          this.toastService.showConfirmToast('update', 'column')
        );
    } else if (this.getFormControls.add.valid) {
      const name = this.form.value.add?.name ?? '';
      const dotColor = this.form.value.add?.dotColor ?? '';

      this.apollo
        .addColumn(name, dotColor)
        .pipe(
          catchError(async error => {
            this.toastService.showWarningToast('add', 'column');
            throw new Error(error);
          })
        )
        .subscribe(() => this.toastService.showConfirmToast('add', 'column'));
    } else {
      return;
    }

    this.formService.onChangeFormVisibility();
  }
}
