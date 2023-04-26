import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [CommonModule],
  exports: [LoadingSpinnerComponent],
})
export class LoadingSpinnerModule {}
