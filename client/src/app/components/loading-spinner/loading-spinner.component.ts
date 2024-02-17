import { Component, Input } from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css'],
  standalone: true,
  imports: [NgIf, NgOptimizedImage],
})
export class LoadingSpinnerComponent {
  @Input() condition: boolean = false;
}
