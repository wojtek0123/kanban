import { NgModule } from '@angular/core';
import { FilterByTitlePipe } from './filter-by-title.pipe';

@NgModule({
  declarations: [FilterByTitlePipe],
  exports: [FilterByTitlePipe],
})
export class FilterByTitlePipeModule {}
