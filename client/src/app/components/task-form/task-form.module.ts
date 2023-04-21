import { NgModule } from '@angular/core';
import { TaskFormComponent } from './task-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TaskFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [TaskFormComponent],
})
export class TaskFormModule {}
