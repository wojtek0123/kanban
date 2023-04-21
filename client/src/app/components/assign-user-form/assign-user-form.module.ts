import { NgModule } from '@angular/core';
import { AssignUserFormComponent } from './assign-user-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CheckWhetherUserIsIncludedModule } from 'src/app/pipes/check-whether-user-is-included/check-whether-user-is-included.module';

@NgModule({
  declarations: [AssignUserFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    CheckWhetherUserIsIncludedModule,
  ],
  exports: [AssignUserFormComponent],
})
export class AssignUserFormModule {}
