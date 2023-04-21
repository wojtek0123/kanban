import { NgModule } from '@angular/core';
import { ProjectFormComponent } from './project-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProjectFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ProjectFormComponent],
})
export class ProjectFormModule {}
