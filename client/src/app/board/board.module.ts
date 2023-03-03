import { NgModule } from '@angular/core';
import { AccordionComponent } from './accordion/accordion.component';
import { BoardComponent } from './board.component';
import { FormComponent } from './form/form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MobileNavigationComponent } from './mobile-navigation/mobile-navigation.component';
import { BoardDetailsComponent } from './board-details/board-details.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ContextMenuModalComponent } from './context-menu-modal/context-menu-modal.component';
import { CollapseButtonComponent } from './collapse-button/collapse-button.component';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectFormComponent } from './project-form/project-form.component';
import { BoardFormComponent } from './board-form/board-form.component';
import { ColumnFormComponent } from './column-form/column-form.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { SubtaskFormComponent } from './subtask-form/subtask-form.component';
import { ToastComponent } from './toast/toast.component';
import { UsersComponent } from './users/users.component';
import { FormWrapperComponent } from './form-wrapper/form-wrapper.component';
import { FilterByTitlePipe } from '../pipes/filter-by-title.pipe';
import { FilterByTagsPipe } from '../pipes/filter-by-tags.pipe';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';
import { TasksComponent } from './tasks/tasks.component';
import { AssignUserFormComponent } from './assign-user-form/assign-user-form.component';
import { DisplayNumberOfUsersInTaskComponent } from './display-number-of-users-in-task/display-number-of-users-in-task.component';
import { ProfileComponent } from './profile/profile.component';
import { TaskTableComponent } from './task-table/task-table.component';
import { MatTableModule } from '@angular/material/table';
import { UserTasksComponent } from './user-tasks/user-tasks.component';

@NgModule({
  declarations: [
    FormComponent,
    BoardComponent,
    AccordionComponent,
    MobileNavigationComponent,
    BoardDetailsComponent,
    ContextMenuComponent,
    ContextMenuModalComponent,
    CollapseButtonComponent,
    AccordionItemComponent,
    ProjectFormComponent,
    BoardFormComponent,
    ColumnFormComponent,
    TaskFormComponent,
    SubtaskFormComponent,
    ToastComponent,
    UsersComponent,
    FormWrapperComponent,
    FilterByTitlePipe,
    FilterByTagsPipe,
    FilterMenuComponent,
    TasksComponent,
    AssignUserFormComponent,
    DisplayNumberOfUsersInTaskComponent,
    ProfileComponent,
    TaskTableComponent,
    UserTasksComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    DragDropModule,
    FormsModule,
    MatTableModule,
  ],
  exports: [BoardComponent],
})
export class BoardModule {}
