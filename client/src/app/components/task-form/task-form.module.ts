import { NgModule } from '@angular/core';
import { TaskFormComponent } from './task-form.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoFocusModule } from 'src/app/directives/auto-focus.module';

@NgModule({
  declarations: [TaskFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutoFocusModule,
    NgOptimizedImage,
  ],
  exports: [TaskFormComponent],
})
export class TaskFormModule {}
