import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormService } from '../../services/form.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ApolloService } from '../../services/apollo.service';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { BoardService } from '../../services/board.service';
import { Observable } from 'rxjs';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: [],
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
    private boardService: BoardService,
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
    }
    if (this.getFormControls.add.valid) {
      const name = this.form.value.add?.name ?? '';

      this.boardService.getSelectedProject
        .pipe(
          map(data => data?.id ?? ''),
          switchMap(projectId => this.apollo.addBoard(name, projectId)),
          catchError(async error => {
            this.toastService.showToast('warning', `Couldn't add a new board`);
            throw new Error(error);
          }),
          take(1)
        )
        .subscribe(data => {
          this.toastService.showToast(
            'confirm',
            'Successfully added a new board'
          );
          this.boardService.onChangeSelectedBoard(data.data?.addBoard);
        });
    }

    if (this.getFormControls.add.invalid && this.getFormControls.edit.invalid) {
      return;
    }

    this.form.reset();
    this.formService.onChangeFormVisibility();
  }
}
