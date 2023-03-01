import { ChangeDetectionStrategy, Component } from '@angular/core';

export type formStatus = 'loading' | 'error' | 'ok';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  isRegister = true;

  constructor() {}

  toggle() {
    this.isRegister = !this.isRegister;
  }
}
