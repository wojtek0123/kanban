import { NgModule } from '@angular/core';
import { AssignUserFormComponent } from './assign-user-form.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CheckWhetherUserIsIncludedModule } from 'src/app/pipes/user-included/user-included.module';

@NgModule({
  declarations: [AssignUserFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    CheckWhetherUserIsIncludedModule,
    NgOptimizedImage,
  ],
  exports: [AssignUserFormComponent],
})
export class AssignUserFormModule {}
