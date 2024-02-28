import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css'],
  standalone: true,
  imports: [NgIf, MatProgressSpinner],
})
export class LoadingSpinnerComponent {
  @Input() condition: boolean = false;
}
