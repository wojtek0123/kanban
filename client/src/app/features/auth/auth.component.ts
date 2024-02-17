import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterComponent } from '../../components/register/register.component';
import { LoginComponent } from '../../components/login/login.component';
import { NgIf } from '@angular/common';

export type formStatus = 'loading' | 'error' | 'ok';

@Component({
  selector: 'app-home',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, LoginComponent, RegisterComponent],
})
export class AuthComponent {
  isRegister = true;

  constructor() {}

  toggle() {
    this.isRegister = !this.isRegister;
  }
}
