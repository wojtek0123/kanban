import { NgModule } from '@angular/core';
import { FormComponent } from './form.component';
import { CommonModule } from '@angular/common';
import { UserTasksModule } from '../user-tasks/user-tasks.module';
import { TaskFormModule } from '../task-form/task-form.module';
import { SubtaskFormModule } from '../subtask-form/subtask-form.module';
import { ProjectFormModule } from '../project-form/project-form.module';
import { BoardFormModule } from '../board-form/board-form.module';
import { ColumnFormModule } from '../column-form/column-form.module';
import { AssignUserFormModule } from '../assign-user-form/assign-user-form.module';
import { UsersModule } from '../users/users.module';
import { FormWrapperModule } from '../form-wrapper/form-wrapper.module';
import { ProfileModule } from '../profile/profile.module';

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    UserTasksModule,
    TaskFormModule,
    SubtaskFormModule,
    ProjectFormModule,
    BoardFormModule,
    ColumnFormModule,
    SubtaskFormModule,
    AssignUserFormModule,
    UsersModule,
    FormWrapperModule,
    ProfileModule,
  ],
  exports: [FormComponent],
})
export class FormModule {}
