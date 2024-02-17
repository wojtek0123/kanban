import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { SupabaseService } from '../../services/supabase/supabase.service';
import { Router } from '@angular/router';
import { formStatus } from '../../features/auth/auth.component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { NgClass, NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf, AsyncPipe],
})
export class LoginComponent {
  isSubmitted = false;
  status = new BehaviorSubject<formStatus>('ok');
  errorMessage = new BehaviorSubject('');

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private supabase: SupabaseService,
    private router: Router
  ) {}

  get formControls() {
    return this.loginForm.controls;
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.status.next('loading');
    this.isSubmitted = true;

    try {
      const { data, error } = await this.supabase.signIn(
        this.formControls.email.value ?? '',
        this.formControls.password.value ?? ''
      );

      if (error) {
        this.status.next('error');
        throw new Error(error.message);
      }

      this.status.next('ok');
      this.supabase.setSession(data.session);
      this.router.navigate(['/']);
    } catch (error) {
      this.status.next('error');

      if (error instanceof Error) {
        this.errorMessage.next(error.message);
      }
    }
  }
}
