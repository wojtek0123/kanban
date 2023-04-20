import { NgModule } from '@angular/core';
import { GetTasksPipe } from './get-tasks.pipe';

@NgModule({
  declarations: [GetTasksPipe],
  exports: [GetTasksPipe],
})
export class GetTasksModule {}
