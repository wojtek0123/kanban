import { NgModule } from '@angular/core';
import { LogoutButtonComponent } from './logout-button.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LogoutButtonComponent],
  imports: [CommonModule],
  exports: [LogoutButtonComponent],
})
export class LogoutButtonModule {}
