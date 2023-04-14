import { NgModule } from '@angular/core';
import { FilterByTagsPipe } from './filter-by-tags.pipe';

@NgModule({
  declarations: [FilterByTagsPipe],
  exports: [FilterByTagsPipe],
})
export class FilterByTagsPipeModule {}
