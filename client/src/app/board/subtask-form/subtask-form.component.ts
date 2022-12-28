import { Component, OnInit } from '@angular/core';
import { FormService } from '../form/form.service';
import { ApolloService } from '../apollo.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-subtask-form',
  templateUrl: './subtask-form.component.html',
  styleUrls: [],
})
export class SubtaskFormComponent implements OnInit {
  isEditing!: boolean;

  form = this.formBuilder.group({
    add: this.formBuilder.group({
      name: ['', [Validators.required]],
    }),
    edit: this.formBuilder.group({
      name: [this.formService.editingSubtask?.name, [Validators.required]],
    }),
  });

  constructor(
    private formService: FormService,
    private apollo: ApolloService,
    private formBuilder: FormBuilder
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
    console.log(this.formService.editingSubtask);
  }

  onSubmit() {
    if (this.isEditing) {
      const id = this.formService.editingSubtask?.id ?? '';
      const name = this.form.value.edit?.name ?? '';

      this.apollo.editSubtask(id, name).subscribe();
    }
    if (!this.isEditing) {
      const name = this.form.value.add?.name ?? '';

      this.apollo.addSubtask(name, false).subscribe();
    }

    this.formService.isEditing = false;
    this.formService.onChangeFormVisibility();
  }
}
