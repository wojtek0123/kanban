import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ApolloService } from '../../services/apollo.service';
import { Observable, Subscription } from 'rxjs';
import { ToastService } from '../../services/toast.service';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: [],
})
export class ProjectFormComponent implements OnInit {
  isEditing$!: Observable<boolean>;
  submitted = false;

  form = this.formBuilder.group({
    add: this.formBuilder.group({
      name: ['', [Validators.required]],
    }),
    edit: this.formBuilder.group({
      name: [this.formService.getEditingProject?.name, [Validators.required]],
    }),
  });

  constructor(
    private formService: FormService,
    private formBuilder: FormBuilder,
    private apollo: ApolloService,
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
      const projectId = this.formService.getEditingProject?.id ?? '';
      const projectName = this.form.value.edit?.name ?? '';

      this.apollo
        .editProject(projectId, projectName)
        .pipe(
          catchError(async error => {
            this.toastService.showWarningToast('update', 'project');
            throw new Error(error);
          }),
          tap(() => this.toastService.showConfirmToast('update', 'project'))
        )
        .subscribe();
    }
    if (this.getFormControls.add.valid) {
      const name = this.form.value.add?.name ?? '';

      this.apollo
        .addProject(name)
        .pipe(
          catchError(async error => {
            this.toastService.showWarningToast('add', 'project');
            throw new Error(error);
          }),
          tap(() => this.toastService.showConfirmToast('add', 'project'))
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
