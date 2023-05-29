import { NgModule } from '@angular/core';
import { ProjectFormComponent } from './project-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoFocusModule } from 'src/app/directives/auto-focus.module';

@NgModule({
  declarations: [ProjectFormComponent],
  imports: [CommonModule, ReactiveFormsModule, AutoFocusModule],
  exports: [ProjectFormComponent],
})
export class ProjectFormModule {}
