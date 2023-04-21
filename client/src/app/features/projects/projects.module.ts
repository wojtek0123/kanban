import { NgModule } from '@angular/core';
import { ProjectsComponent } from './projects.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormModule } from '../../components/form/form.module';
import { OpenFormButtonModule } from '../../components/open-form-button/open-form-button.module';
import { ToastModule } from '../../components/toast/toast.module';
import { GetColumnsModule } from '../../pipes/get-columns/get-columns.module';
import { GetTasksModule } from '../../pipes/get-tasks/get-tasks.module';
import { GetSubtasksModule } from '../../pipes/get-subtasks/get-subtasks.module';
import { ContextMenuModalModule } from '../../components/context-menu-modal/context-menu-modal.module';
import { ContextMenuModule } from '../../components/context-menu/context-menu.module';
import { LogoutButtonModule } from '../../components/logout-button/logout-button.module';
import { NavigationModule } from '../../components/navigation/navigation.module';

@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormModule,
    OpenFormButtonModule,
    ToastModule,
    GetColumnsModule,
    GetTasksModule,
    GetSubtasksModule,
    ContextMenuModalModule,
    ContextMenuModule,
    LogoutButtonModule,
    NavigationModule,
  ],
  exports: [ProjectsComponent],
})
export class ProjectsModule {}
