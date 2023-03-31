import { NgModule } from '@angular/core';
import { ContextMenuComponent } from './context-menu.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ContextMenuComponent],
  imports: [CommonModule],
  exports: [ContextMenuComponent],
})
export class ContextMenuModule {}
