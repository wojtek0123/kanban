import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="flex flex-col items-center gap-8 mt-8">
      <mat-spinner></mat-spinner>
    </div>
  `,
  standalone: true,
  imports: [NgIf, MatProgressSpinnerModule],
})
export class LoadingSpinnerComponent {}
