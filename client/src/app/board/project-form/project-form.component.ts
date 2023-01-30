import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormService } from '../form/form.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ApolloService } from '../apollo.service';
import { Subscription } from 'rxjs';
import { ToastService } from '../toast/toast.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: [],
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  isEditing!: boolean;
  subscription!: Subscription;
  submitted = false;

  form = this.formBuilder.group({
    add: this.formBuilder.group({
      name: ['', [Validators.required]],
    }),
    edit: this.formBuilder.group({
      name: [this.formService.editingProject?.name, [Validators.required]],
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
    this.subscription = this.formService.isEditing.subscribe(
      state => (this.isEditing = state)
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.isEditing && this.getFormControls.edit.valid) {
      const projectId = this.formService.editingProject?.id ?? '';
      const projectName = this.form.value.edit?.name ?? '';

      this.apollo
        .editProject(projectId, projectName)
        .pipe(
          catchError(async () => this.toastService.showToast('update', 'board'))
        )
        .subscribe();
    } else if (!this.isEditing && this.getFormControls.add.valid) {
      const name = this.form.value.add?.name ?? '';

      this.apollo
        .addProject(name)
        .pipe(
          catchError(async () => this.toastService.showToast('add', 'board'))
        )
        .subscribe();
    } else {
      return;
    }

    this.formService.onChangeFormVisibility();
    this.form.reset();
  }
}
