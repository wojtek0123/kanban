import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [CommonModule, NgOptimizedImage],
  exports: [LoadingSpinnerComponent],
})
export class LoadingSpinnerModule {}
