import { NgModule } from '@angular/core';
import { userIncludedPipe } from './user-included.pipe';

@NgModule({
  declarations: [userIncludedPipe],
  exports: [userIncludedPipe],
})
export class CheckWhetherUserIsIncludedModule {}
