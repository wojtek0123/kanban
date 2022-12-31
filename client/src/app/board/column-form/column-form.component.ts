import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormService } from '../form/form.service';
import { ApolloService } from '../apollo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: [],
})
export class ColumnFormComponent implements OnInit, OnDestroy {
  isEditing!: boolean;
  subscription!: Subscription;

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
        this.formService.editingColumn?.dotColor
      ),
    }),
  });

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private apollo: ApolloService
  ) {}

  ngOnInit(): void {
    this.formService.isEditing.subscribe(state => (this.isEditing = state));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
      const dotColor = this.form.value.edit?.dotColor ?? '';

      this.apollo.editColumn(id, name, dotColor).subscribe();
    }
    if (!this.isEditing) {
      const name = this.form.value.add?.name ?? '';
      const dotColor = this.form.value.add?.dotColor ?? '';

      this.apollo.addColumn(name, dotColor).subscribe();
    }

    this.formService.onChangeFormVisibility();
  }
}
