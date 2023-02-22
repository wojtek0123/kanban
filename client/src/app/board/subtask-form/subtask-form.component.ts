import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { ApolloService } from '../../services/apollo.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../../services/toast.service';
import { BoardService } from 'src/app/services/board.service';

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
    private toastService: ToastService,
    private boardService: BoardService
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
            this.toastService.showToast(
              'warning',
              'Coudn&apos;t update this subtask'
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
    }
    if (this.getFormControls.add.valid) {
      const name = this.form.value.add?.name ?? '';

      this.apollo
        .addSubtask(name, false)
        .pipe(
          catchError(async error => {
            this.toastService.showToast(
              'warning',
              'Coudn&apos;t add a new subtask'
            );
            throw new Error(error);
          })
        )
        .subscribe(() => {
          () =>
            this.toastService.showToast(
              'confirm',
              'Successfully added a new subtask'
            );
          this.boardService.refreshSelectedBoard();
        });
    }

    if (this.getFormControls.add.invalid && this.getFormControls.edit.invalid) {
      return;
    }

    this.form.reset();
    this.formService.onChangeFormVisibility();
  }
}
