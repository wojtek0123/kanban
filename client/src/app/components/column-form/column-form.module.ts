import { NgModule } from '@angular/core';
import { ColumnFormComponent } from './column-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoFocusModule } from 'src/app/directives/auto-focus.module';

@NgModule({
  declarations: [ColumnFormComponent],
  imports: [CommonModule, ReactiveFormsModule, AutoFocusModule],
  exports: [ColumnFormComponent],
})
export class ColumnFormModule {}
