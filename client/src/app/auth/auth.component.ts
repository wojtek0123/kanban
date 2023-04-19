import { ChangeDetectionStrategy, Component } from '@angular/core';

export type formStatus = 'loading' | 'error' | 'ok';

@Component({
  selector: 'app-home',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  isRegister = true;

  constructor() {}

  toggle() {
    this.isRegister = !this.isRegister;
  }
}
