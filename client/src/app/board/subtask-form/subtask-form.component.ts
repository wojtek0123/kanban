import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormService } from '../../services/form.service';
import { ApolloService } from '../../services/apollo.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-subtask-form',
  templateUrl: './subtask-form.component.html',
  styleUrls: [],
})
export class SubtaskFormComponent implements OnInit {
  isEditing$!: Observable<boolean>;
  submitted = false;

  form = this.formBuilder.group({
    add: this.formBuilder.group({
      name: ['', [Validators.required]],
    }),
    edit: this.formBuilder.group({
      name: [this.formService.getEditingSubtask?.name, [Validators.required]],
    }),
  });

  constructor(
    private formService: FormService,
    private apollo: ApolloService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {}

  get getAddControls() {
    return this.form.controls.add.controls;
  }

  get getEditControls() {
    return this.form.controls.edit.controls;
  }

  get getFormControls() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.isEditing$ = this.formService.getIsEditing;
  }

  onSubmit() {
    this.submitted = true;

    if (this.getFormControls.edit.valid) {
      const id = this.formService.getEditingSubtask?.id ?? '';
      const name = this.form.value.edit?.name ?? '';

      this.apollo
        .editSubtask(id, name)
        .pipe(
          catchError(async error => {
            this.toastService.showWarningToast('update', 'subtask');
            throw new Error(error);
          }),
          tap(() => this.toastService.showConfirmToast('update', 'subtask'))
        )
        .subscribe();
    }
    if (this.getFormControls.add.valid) {
      const name = this.form.value.add?.name ?? '';

      this.apollo
        .addSubtask(name, false)
        .pipe(
          catchError(async error => {
            this.toastService.showWarningToast('add', 'subtask');
            throw new Error(error);
          }),
          tap(() => this.toastService.showConfirmToast('add', 'subtask'))
        )
        .subscribe();
    }

    if (this.getFormControls.add.invalid && this.getFormControls.edit.invalid) {
      return;
    }

    this.form.reset();
    this.formService.onChangeFormVisibility();
  }
}
