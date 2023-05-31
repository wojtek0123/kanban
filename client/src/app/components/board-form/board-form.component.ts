import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { FormService } from '../../services/form/form.service';
import { ApolloService } from '../../services/apollo/apollo.service';
import { Observable, combineLatest } from 'rxjs';
import { ToastService } from '../../services/toast/toast.service';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardFormComponent implements OnInit {
  isEditing$!: Observable<boolean>;
  submitted = false;

  form = this.formBuilder.group({
    add: this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
    }),
    edit: this.formBuilder.group({
      name: this.formBuilder.control(this.formService.getEditingBoard?.name, [
        Validators.required,
      ]),
    }),
  });

  constructor(
    private formService: FormService,
    private formBuilder: FormBuilder,
    private apollo: ApolloService,
    private toastService: ToastService,
    private router: Router,
    private navigationService: NavigationService
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
      const id = this.formService.getEditingBoard?.id ?? '';
      const name = this.form.value.edit?.name ?? '';

      this.apollo
        .editBoard(id, name)
        .pipe(
          catchError(async error => {
            this.toastService.showToast(
              'warning',
              `Couldn't update a new board`
            );
            throw new Error(error);
          })
        )
        .subscribe(() =>
          this.toastService.showToast(
            'confirm',
            'Successfully updated this board'
          )
        );
      this.formService.onChangeFormVisibility();
    }
  }

  onAdd() {
    this.submitted = true;

    if (this.getFormControls.add.valid) {
      const name = this.form.value.add?.name ?? '';

      const response$ = this.formService.parentId$.pipe(
        switchMap(parentId => this.apollo.addBoard(name, parentId)),
        catchError(async error => {
          this.toastService.showToast('warning', `Couldn't add a new board`);
          throw new Error(error);
        }),
        take(1),
        map(response => response.data)
      );

      const redirect$ = this.formService.redirectToBoard$;

      combineLatest([response$, redirect$])
        .pipe(
          map(([data, redirect]) => {
            if (redirect) {
              console.log(redirect);
              this.router.navigate([
                '/',
                'project',
                data?.addBoard.projectId,
                'board',
                data?.addBoard.id,
              ]);
            }
          }),
          take(1)
        )
        .subscribe(() => {
          this.toastService.showToast(
            'confirm',
            'Successfully added a new board'
          );
        });

      this.navigationService.showMenu$.pipe(take(1)).subscribe(state => {
        if (state) this.navigationService.onMenu();
      });
      this.formService.onChangeFormVisibility();
    }
  }
}
