import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { FormService } from '../../services/form/form.service';
import { ApolloService } from '../../services/apollo/apollo.service';
import { ToastService } from '../../services/toast/toast.service';
import { AutoFocusDirective } from '../../directives/auto-focus.directive';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
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
export class ProjectFormComponent implements OnInit {
  isEditing$ = new Observable<boolean>();
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

  ngOnInit() {
    this.isEditing$ = this.formService.isEditing$;
  }

  onEdit() {
    this.submitted = true;

    if (this.getFormControls.edit.valid) {
      const projectId = this.formService.getEditingProject?.id ?? '';
      const projectName = this.form.value.edit?.name ?? '';

      this.apollo
        .editProject(projectId, projectName)
        .pipe(
          catchError(async error => {
            this.toastService.showToast(
              'warning',
              `Couldn't update this project`
            );
            throw new Error(error);
          })
        )
        .subscribe(() =>
          this.toastService.showToast(
            'confirm',
            'Successfully updated this project'
          )
        );

      this.formService.onChangeFormVisibility();
    }
  }

  onAdd() {
    this.submitted = true;

    if (this.getFormControls.add.valid) {
      const name = this.form.value.add?.name ?? '';

      this.apollo
        .addProject(name)
        .pipe(
          catchError(async error => {
            this.toastService.showToast(
              'warning',
              `Couldn't add a new project`
            );
            throw new Error(error);
          }),
          take(1)
        )
        .subscribe(() =>
          this.toastService.showToast(
            'confirm',
            'Successfully added a new project'
          )
        );

      this.formService.onChangeFormVisibility();
    }
  }
}
