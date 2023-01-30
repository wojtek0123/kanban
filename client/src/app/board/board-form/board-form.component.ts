import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormService } from '../form/form.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ApolloService } from '../apollo.service';
import { catchError, tap } from 'rxjs/operators';
import { BoardService } from '../board.service';
import { Subscription } from 'rxjs';
import { ToastService } from '../toast/toast.service';

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
          catchError(async () => this.toastService.showToast('update', 'board'))
        )
        .subscribe();
    } else if (!this.isEditing && this.getFormControls.add.valid) {
      const name = this.form.value.add?.name ?? '';

      this.apollo
        .addBoard(name)
        .pipe(
          tap(data => {
            if (data.data?.addBoard) {
              this.boardService.onChangeSelectedBoard(data.data.addBoard);
            }
          }),
          catchError(async () => this.toastService.showToast('add', 'board'))
        )
        .subscribe();
    } else {
      return;
    }

    this.form.reset();
    this.formService.onChangeFormVisibility();
  }
}
