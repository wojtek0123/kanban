import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass, NgIf, AsyncPipe } from '@angular/common';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { AuthWrapperComponent } from '../../components/auth-wrapper.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    AsyncPipe,
    RouterLink,
    SignInFormComponent,
    AuthWrapperComponent,
  ],
})
export class LoginComponent {}
