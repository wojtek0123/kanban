import { NgModule } from '@angular/core';
import { ToastComponent } from './toast.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@NgModule({
  declarations: [ToastComponent],
  imports: [CommonModule, NgOptimizedImage],
  exports: [ToastComponent],
})
export class ToastModule {}
