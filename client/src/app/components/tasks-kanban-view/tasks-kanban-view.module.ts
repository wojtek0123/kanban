import { NgModule } from '@angular/core';
import { TasksComponent } from './tasks-kanban-view.component';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContextMenuModule } from '../context-menu/context-menu.module';
import { SortPipeModule } from 'src/app/pipes/sort/sort.module';
import { FilterByTagsPipeModule } from 'src/app/pipes/filter-by-tags/filter-by-tags.module';
import { FilterByTitlePipeModule } from 'src/app/pipes/filter-by-title/filter-by-title.module';
import { DisplayNumberOfUsersInTaskModule } from '../display-number-of-users-in-task/display-number-of-users-in-task.module';
import { OpenFormButtonModule } from '../open-form-button/open-form-button.module';
import { GetColumnsModule } from 'src/app/pipes/get-columns/get-columns.module';
import { GetColumnsWithoutOneSpecificModule } from 'src/app/pipes/get-columns-without-one-specific/get-columns-without-one-specific.module';
import { GetColumnIdsModule } from 'src/app/pipes/get-column-ids/get-column-ids.module';

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
    OpenFormButtonModule,
    GetColumnsModule,
    GetColumnsWithoutOneSpecificModule,
    GetColumnIdsModule,
  ],
  exports: [TasksComponent],
})
export class TasksModule {}
