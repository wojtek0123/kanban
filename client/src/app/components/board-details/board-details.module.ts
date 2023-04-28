import { NgModule } from '@angular/core';
import { BoardDetailsComponent } from './board-details.component';
import { CommonModule } from '@angular/common';
import { ContextMenuModule } from '../context-menu/context-menu.module';
import { FormsModule } from '@angular/forms';
import { FilterMenuModule } from '../filter-menu/filter-menu.module';
import { TasksModule } from '../tasks-kanban-view/tasks-kanban-view.module';
import { TaskTableModule } from '../tasks-table-view/tasks-table-view.module';
import { GetTagsFromTasksModule } from 'src/app/pipes/get-tags-from-tasks/get-tags-from-tasks.module';
import { LogoutButtonModule } from '../logout-button/logout-button.module';
import { OpenFormButtonModule } from '../open-form-button/open-form-button.module';

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
    OpenFormButtonModule,
  ],
  exports: [BoardDetailsComponent],
})
export class BoardDetailsModule {}
