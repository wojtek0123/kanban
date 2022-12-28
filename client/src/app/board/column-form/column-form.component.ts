import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormService } from '../form/form.service';
import { ApolloService } from '../apollo.service';

@Component({
  selector: 'app-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: [],
})
export class ColumnFormComponent implements OnInit {
  isEditing!: boolean;

  form = this.formBuilder.group({
    add: this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      dotColor: this.formBuilder.control('#ffffff'),
    }),
    edit: this.formBuilder.group({
      name: this.formBuilder.control(this.formService.editingColumn?.name, [
        Validators.required,
      ]),
      dotColor: this.formBuilder.control(
        this.formService.editingColumn?.backgroundColor
      ),
    }),
  });

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private apollo: ApolloService
  ) {}

  ngOnInit(): void {
    this.isEditing = this.formService.isEditing;
  }

  get getAddControls() {
    return this.form.controls.add.controls;
  }

  get getEditControls() {
    return this.form.controls.edit.controls;
  }

  get getFormControls() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.isEditing) {
      const id = this.formService.editingColumn?.id ?? '';
      const name = this.form.value.edit?.name ?? '';

      this.apollo.editColumn(id, name).subscribe();
    }
    if (!this.isEditing) {
      const name = this.form.value.add?.name ?? '';

      this.apollo.addColumn(name).subscribe();
    }

    this.formService.isEditing = false;
    this.formService.onChangeFormVisibility();
  }
}
