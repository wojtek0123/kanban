import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { AuthWrapperComponent } from '../../components/auth-wrapper.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    NgIf,
    RouterLink,
    SignUpFormComponent,
    AuthWrapperComponent,
  ],
})
export class RegisterComponent {}
