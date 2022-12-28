import { Component, OnInit } from '@angular/core';
import { FormService } from '../form/form.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ApolloService } from '../apollo.service';
import { tap } from 'rxjs/operators';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: [],
})
export class BoardFormComponent implements OnInit {
  isEditing!: boolean;

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
    private board: BoardService
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
    this.isEditing = this.formService.isEditing;
  }

  onSubmit() {
    if (this.isEditing) {
      const id = this.formService.editingBoard?.id ?? '';
      const name = this.form.value.edit?.name ?? '';

      this.apollo.editBoard(id, name).subscribe();
    }
    if (!this.isEditing) {
      const name = this.form.value.add?.name ?? '';

      this.apollo
        .addBoard(name)
        .pipe(
          tap(data => {
            if (data.data?.addBoard) {
              this.board.onChangeSelectedBoard(data.data.addBoard);
            }
          })
        )
        .subscribe();
    }

    this.formService.isEditing = false;
    this.formService.onChangeFormVisibility();
  }
}
