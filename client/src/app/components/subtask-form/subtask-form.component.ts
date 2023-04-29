import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

import { FormService } from '../../services/form/form.service';
import { ApolloService } from '../../services/apollo/apollo.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-subtask-form',
  templateUrl: './subtask-form.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    this.isEditing$ = this.formService.isEditing$;
  }

  onEdit() {
    this.submitted = true;

    if (this.getFormControls.edit.valid) {
      const id = this.formService.getEditingSubtask?.id ?? '';
      const name = this.form.value.edit?.name ?? '';

      this.apollo
        .editSubtask(id, name)
        .pipe(
          catchError(async error => {
            this.toastService.showToast(
              'warning',
              `Couldn't update this subtask`
            );
            throw new Error(error);
          })
        )
        .subscribe(() =>
          this.toastService.showToast(
            'confirm',
            'Successfully updated this subtask'
          )
        );

      this.formService.onChangeFormVisibility();
    }
  }

  onAdd() {
    this.submitted = true;

    if (this.getFormControls.add.valid) {
      const name = this.form.value.add?.name ?? '';

      this.formService.parentId$
        .pipe(
          switchMap(parentId => this.apollo.addSubtask(name, false, parentId)),
          take(1),
          catchError(async error => {
            this.toastService.showToast(
              'warning',
              `Couldn't add a new subtask`
            );
            throw new Error(error);
          })
        )
        .subscribe(() => {
          this.toastService.showToast(
            'confirm',
            'Successfully added a new subtask'
          );
        });

      this.formService.onChangeFormVisibility();
    }
  }
}
