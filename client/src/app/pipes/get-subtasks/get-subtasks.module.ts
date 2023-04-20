import { NgModule } from '@angular/core';
import { GetSubtasksPipe } from './get-subtasks.pipe';

@NgModule({
  declarations: [GetSubtasksPipe],
  exports: [GetSubtasksPipe],
})
export class GetSubtasksModule {}
