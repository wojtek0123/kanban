import { NgModule } from '@angular/core';
import { CheckWhetherUserIsIncludedPipe } from './check-whether-user-is-included.pipe';

@NgModule({
  declarations: [CheckWhetherUserIsIncludedPipe],
  exports: [CheckWhetherUserIsIncludedPipe],
})
export class CheckWhetherUserIsIncludedModule {}
