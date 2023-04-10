import { NgModule } from '@angular/core';
import { TasksComponent } from './tasks.component';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContextMenuModule } from '../context-menu/context-menu.module';
import { SortPipeModule } from 'src/app/pipes/sort.module';
import { FilterByTagsPipeModule } from 'src/app/pipes/filter-by-tags.module';
import { FilterByTitlePipeModule } from 'src/app/pipes/filter-by-title.module';
import { DisplayNumberOfUsersInTaskModule } from '../display-number-of-users-in-task/display-number-of-users-in-task.module';

@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    DragDropModule,
    ContextMenuModule,
    SortPipeModule,
    FilterByTagsPipeModule,
    FilterByTitlePipeModule,
    DisplayNumberOfUsersInTaskModule,
  ],
  exports: [TasksComponent],
})
export class TasksModule {}