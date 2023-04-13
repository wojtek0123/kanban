import { NgModule } from '@angular/core';
import { DisplayNumberOfUsersInTaskComponent } from './display-number-of-users-in-task.component';
import { CommonModule } from '@angular/common';
import { OpenFormButtonModule } from '../open-form-button/open-form-button.module';

@NgModule({
  declarations: [DisplayNumberOfUsersInTaskComponent],
  imports: [CommonModule, OpenFormButtonModule],
  exports: [DisplayNumberOfUsersInTaskComponent],
})
export class DisplayNumberOfUsersInTaskModule {}
