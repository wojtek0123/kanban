import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormService } from '../../services/form.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ApolloService } from '../../services/apollo.service';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { BoardService } from '../../services/board.service';
import { Subscription } from 'rxjs';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: [],
})
export class BoardFormComponent implements OnInit, OnDestroy {
  isEditing!: boolean;
  subscription!: Subscription;
  submitted = false;

  form = this.formBuilder.group({
    add: this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
    }),
    edit: this.formBuilder.group({
      name: this.formBuilder.control(this.formService.editingBoard?.name, [
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
      const id = this.formService.editingBoard?.id ?? '';
      const name = this.form.value.edit?.name ?? '';

      this.apollo
        .editBoard(id, name)
        .pipe(
          catchError(async error => {
            this.toastService.showWarningToast('update', 'board');
            throw new Error(error);
          }),
          tap(() => this.toastService.showConfirmToast('update', 'board'))
        )
        .subscribe();
    } else if (!this.isEditing && this.getFormControls.add.valid) {
      const name = this.form.value.add?.name ?? '';

      this.boardService.selectedProject
        .pipe(
          map(data => data?.id ?? ''),
          switchMap(projectId => this.apollo.addBoard(name, projectId)),
          catchError(async error => {
            this.toastService.showWarningToast('add', 'board');
            throw new Error(error);
          }),
          tap(() => this.toastService.showConfirmToast('add', 'board')),
          take(1)
        )
        .subscribe(data => {
          console.log(data);
          this.boardService.onChangeSelectedBoard(data.data?.addBoard);
        });
    } else {
      return;
    }

    this.form.reset();
    this.formService.onChangeFormVisibility();
  }
}
