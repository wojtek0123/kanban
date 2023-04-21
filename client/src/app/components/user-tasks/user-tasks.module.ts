import { NgModule } from '@angular/core';
import { UserTasksComponent } from './user-tasks.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserTasksComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [UserTasksComponent],
})
export class UserTasksModule {}
