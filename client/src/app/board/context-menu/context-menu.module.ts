import { NgModule } from '@angular/core';
import { ContextMenuComponent } from './context-menu.component';
import { CommonModule } from '@angular/common';
import { ShowElementModule } from 'src/app/pipes/show-element.module';

@NgModule({
  declarations: [ContextMenuComponent],
  imports: [CommonModule, ShowElementModule],
  exports: [ContextMenuComponent],
})
export class ContextMenuModule {}
