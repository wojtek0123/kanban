import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormService } from '../form/form.service';
import { ApolloService } from '../apollo.service';
import { Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: [],
})
export class ColumnFormComponent implements OnInit, OnDestroy {
  isEditing!: boolean;
  subscription!: Subscription;
  submitted = false;

  form = this.formBuilder.group({
    add: this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      dotColor: this.formBuilder.control('#ffffff'),
    }),
    edit: this.formBuilder.group({
      name: this.formBuilder.control(this.formService.editingColumn?.name, [
        Validators.required,
      ]),
      dotColor: this.formBuilder.control(
        this.formService.editingColumn?.dotColor
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
    this.formService.isEditing.subscribe(state => (this.isEditing = state));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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

    if (this.isEditing && this.getFormControls.edit.valid) {
      const id = this.formService.editingColumn?.id ?? '';
      const name = this.form.value.edit?.name ?? '';
      const dotColor = this.form.value.edit?.dotColor ?? '';

      this.apollo
        .editColumn(id, name, dotColor)
        .pipe(
          catchError(async error => {
            this.toastService.showWarningToast('update', 'column');
            throw new Error(error);
          }),
          tap(() => this.toastService.showConfirmToast('update', 'column'))
        )
        .subscribe();
    } else if (!this.isEditing && this.getFormControls.add.valid) {
      const name = this.form.value.add?.name ?? '';
      const dotColor = this.form.value.add?.dotColor ?? '';

      this.apollo
        .addColumn(name, dotColor)
        .pipe(
          catchError(async error => {
            this.toastService.showWarningToast('add', 'column');
            throw new Error(error);
          }),
          tap(() => this.toastService.showConfirmToast('add', 'column'))
        )
        .subscribe();
    } else {
      return;
    }

    this.formService.onChangeFormVisibility();
  }
}
