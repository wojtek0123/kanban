import { NgModule } from '@angular/core';
import { SubtaskFormComponent } from './subtask-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SubtaskFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [SubtaskFormComponent],
})
export class SubtaskFormModule {}
