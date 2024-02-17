import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../../../../../services/supabase/supabase.service';
import { Router } from '@angular/router';
import { FormStatus } from '../../../../auth.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sign-in-form',
  template: `
    <form class="form" [formGroup]="form" (ngSubmit)="onSubmit()">
      <label class="form-label" for="email">Email</label>
      <input
        class="form-input"
        [ngClass]="{
          error:
            form.controls.email.invalid &&
            (form.controls.email.touched || isSubmitted)
        }"
        type="email"
        id="email"
        name="email"
        formControlName="email" />
      @if (form.controls.email.getError('required') &&
      (form.controls.email.touched || isSubmitted)) {
      <span class="form-invalid-message">Email is required</span>
      } @else if (form.controls.email.getError('email') &&
      (form.controls.email.touched || isSubmitted)) {
      <span class="form-invalid-message">Email is invalid</span>
      }
      <label class="form-label" for="password">Password</label>
      <input
        class="form-input"
        type="password"
        id="password"
        formControlName="password"
        [ngClass]="{
          error:
            form.controls.password.invalid &&
            (form.controls.password.touched || isSubmitted)
        }" />
      @if (form.controls.password.getError('required') &&
      (form.controls.password.touched || isSubmitted)) {
      <span class="form-invalid-message">Password is required</span>
      } @else if (form.controls.password.getError('minlength') &&
      (form.controls.password.touched || isSubmitted)) {
      <span class="form-invalid-message">
        Password should have at least 8 characters</span
      >
      } @if (status() === 'error') {
      <span class="form-invalid-message">{{ error }}</span>
      }

      <button type="submit" class="button-global form-button">
        @if (status() !== 'loading') {
        <span>Sign in</span>
        } @else {
        <span>Loading...</span>
        }
      </button>
    </form>
  `,
  styleUrl: './sign-in-form.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInFormComponent {
  private fb = inject(FormBuilder);
  private supabase = inject(SupabaseService);
  private router = inject(Router);

  form = this.fb.group({
    email: [null, [Validators.email, Validators.required]],
    password: [null, [Validators.minLength(8), Validators.required]],
  });
  status = signal<FormStatus>('idle');
  isSubmitted = false;
  error: string | null = null;

  async onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    this.status.set('loading');

    try {
      const { data, error } = await this.supabase.signIn({
        email: this.form.value.email ?? '',
        password: this.form.value.password ?? '',
      });

      if (error) {
        this.status.set('error');
        this.error = error.message;
        return;
      }

      this.status.set('ok');
      this.supabase.setSession(data.session);
      return await this.router.navigate(['/projects']);
    } catch (error) {
      this.status.set('error');

      if (error instanceof Error) throw new Error(error.message);

      return error;
    }
  }
}
