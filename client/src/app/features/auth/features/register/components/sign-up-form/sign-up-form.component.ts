import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { FormStatus } from '../../../../auth.component';
import { SupabaseService } from '../../../../../../services/supabase/supabase.service';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent {
  private fb = inject(FormBuilder);
  private supabase = inject(SupabaseService);
  private router = inject(Router);

  status: FormStatus = 'idle';
  isSubmitted = false;

  form = this.fb.group(
    {
      email: [null, [Validators.email, Validators.required]],
      nickname: [null, [Validators.maxLength(25), Validators.required]],
      password: [null, [Validators.minLength(8), Validators.required]],
      confirmPassword: [null, [Validators.required]],
    },
    {
      validators: [this.matchPassword('password', 'confirmPassword')],
    }
  );

  matchPassword(password: string, confirmPassword: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['passwordMismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }

  async onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    this.status = 'loading';

    try {
      const { error, data } = await this.supabase.signUp(
        this.form.controls.email.value ?? '',
        this.form.controls.password.value ?? '',
        this.form.controls.nickname.value ?? ''
      );
      if (error) {
        this.status = 'error';
        // this.errorMessage = error.message;
        return;
      }

      this.supabase.setSession(data.session);

      this.status = 'ok';
      await this.router.navigate(['/projects']);
    } catch (error) {
      if (error instanceof Error) {
        // this.errorMessage = error.message;
      }
      this.status = 'error';
    } finally {
      this.form.reset();
      // this.showToast = true;

      // this.timeoutCleaner = setTimeout(() => {
      //   this.showToast = false;
      // }, 5000);
    }
  }
}
