import { NgModule } from '@angular/core';
import { AssignUserFormComponent } from './assign-user-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AssignUserFormComponent],
  imports: [CommonModule, ReactiveFormsModule, BrowserModule],
  exports: [AssignUserFormComponent],
})
export class AssignUserFormModule {}
