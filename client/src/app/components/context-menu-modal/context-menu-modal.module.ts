import { NgModule } from '@angular/core';
import { ContextMenuModalComponent } from './context-menu-modal.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ContextMenuModalComponent],
  imports: [CommonModule],
  exports: [ContextMenuModalComponent],
})
export class ContextMenuModalModule {}
