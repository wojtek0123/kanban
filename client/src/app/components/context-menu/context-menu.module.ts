import { NgModule } from '@angular/core';
import { ContextMenuComponent } from './context-menu.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ShowElementModule } from 'src/app/pipes/show-element/show-element.module';

@NgModule({
  declarations: [ContextMenuComponent],
  imports: [CommonModule, ShowElementModule, NgOptimizedImage],
  exports: [ContextMenuComponent],
})
export class ContextMenuModule {}
