import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SupabaseService } from '../../supabase.service';
import { Router } from '@angular/router';
import { formStatus } from '../home.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isSubmitted = false;
  status: formStatus = 'ok';
  errorMessage = '';

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.min(8), Validators.required]],
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
      console.log('INVALID');
      return;
    }

    this.status = 'loading';
    this.isSubmitted = true;

    try {
      const { data, error } = await this.supabase.signIn(
        this.loginForm.controls.email.value ?? '',
        this.loginForm.controls.password.value ?? ''
      );
      if (error) {
        this.status = 'error';
        this.errorMessage = error.message;
        return;
      }

      this.status = 'ok';
      this.supabase.setSession(data.session);
      this.router.navigate(['']).then(error => console.log(error));
    } catch (error) {
      this.status = 'error';
      if (error instanceof Error) {
        this.errorMessage = error.message;
      }
    }
  }
}
