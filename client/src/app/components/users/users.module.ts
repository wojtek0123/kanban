import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, ReactiveFormsModule, NgOptimizedImage],
  exports: [UsersComponent],
})
export class UsersModule {}
