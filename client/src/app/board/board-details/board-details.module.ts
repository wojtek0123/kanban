import { NgModule } from '@angular/core';
import { BoardDetailsComponent } from './board-details.component';
import { CommonModule } from '@angular/common';
import { ContextMenuModule } from '../context-menu/context-menu.module';
import { FormsModule } from '@angular/forms';
import { FilterMenuModule } from '../filter-menu/filter-menu.module';
import { TasksModule } from '../tasks/tasks.module';
import { TaskTableModule } from '../task-table/task-table.module';

@NgModule({
  declarations: [BoardDetailsComponent],
  imports: [
    CommonModule,
    ContextMenuModule,
    TaskTableModule,
    FormsModule,
    FilterMenuModule,
    TasksModule,
  ],
  exports: [BoardDetailsComponent],
})
export class BoardDetailsModule {}
