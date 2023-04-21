import { NgModule } from '@angular/core';
import { TaskTableComponent } from './task-table.component';
import { CommonModule } from '@angular/common';
import { SortPipeModule } from 'src/app/pipes/sort/sort.module';
import { FilterByTagsPipeModule } from 'src/app/pipes/filter-by-tags/filter-by-tags.module';
import { FilterByTitlePipeModule } from 'src/app/pipes/filter-by-title/filter-by-title.module';

@NgModule({
  declarations: [TaskTableComponent],
  imports: [
    CommonModule,
    SortPipeModule,
    FilterByTagsPipeModule,
    FilterByTitlePipeModule,
  ],
  exports: [TaskTableComponent],
})
export class TaskTableModule {}
