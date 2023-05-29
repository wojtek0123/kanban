import { NgModule } from '@angular/core';
import { SubtaskFormComponent } from './subtask-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoFocusModule } from 'src/app/directives/auto-focus.module';

@NgModule({
  declarations: [SubtaskFormComponent],
  imports: [CommonModule, ReactiveFormsModule, AutoFocusModule],
  exports: [SubtaskFormComponent],
})
export class SubtaskFormModule {}
