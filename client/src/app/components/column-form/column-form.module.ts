import { NgModule } from '@angular/core';
import { ColumnFormComponent } from './column-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ColumnFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ColumnFormComponent],
})
export class ColumnFormModule {}
