import { NgModule } from '@angular/core';
import { BoardDetailsComponent } from './board-details.component';
import { CommonModule } from '@angular/common';
import { ContextMenuModule } from '../context-menu/context-menu.module';
import { FormsModule } from '@angular/forms';
import { FilterMenuModule } from '../filter-menu/filter-menu.module';
import { TasksModule } from '../tasks/tasks.module';
import { TaskTableModule } from '../task-table/task-table.module';
import { GetTagsFromTasksModule } from 'src/app/pipes/get-tags-from-tasks.module';
import { LogoutButtonModule } from '../logout-button/logout-button.module';

@NgModule({
  declarations: [BoardDetailsComponent],
  imports: [
    CommonModule,
    ContextMenuModule,
    TaskTableModule,
    FormsModule,
    FilterMenuModule,
    TasksModule,
    GetTagsFromTasksModule,
    LogoutButtonModule,
  ],
  exports: [BoardDetailsComponent],
})
export class BoardDetailsModule {}
