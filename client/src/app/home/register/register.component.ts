import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { formStatus } from '../home.component';
import { Router } from '@angular/router';
import { ApolloService } from 'src/app/services/apollo.service';
import { async, catchError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  showToast = false;
  status: formStatus = 'ok';
  isSubmitted = false;
  errorMessage = '';
  timeoutCleaner: NodeJS.Timeout | null = null;

  registerForm = this.fb.group(
    {
      email: ['', [Validators.email, Validators.required]],
      nickname: ['', [Validators.maxLength(25), Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [this.matchPassword('password', 'confirmPassword')],
    }
  );

  constructor(
    private supabase: SupabaseService,
    private fb: FormBuilder,
    private router: Router,
    private apollo: ApolloService
  ) {}

  closeToast() {
    this.showToast = false;
    if (this.timeoutCleaner) {
      clearTimeout(this.timeoutCleaner);
    }
  }

  get formControls() {
    return this.registerForm.controls;
  }

  get nicknameLength() {
    return this.registerForm.controls.nickname.value?.length ?? 0;
  }

  get confirmPasswordLength() {
    return this.registerForm.controls.confirmPassword.value?.length ?? 0;
  }

  get passwordLength() {
    return this.registerForm.controls.password.value?.length ?? 0;
  }

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
    if (this.registerForm.invalid) {
      this.status = 'error';
      this.errorMessage = 'Form is invalid!';
      return;
    }

    this.isSubmitted = true;
    this.status = 'loading';

    try {
      const email = this.registerForm.controls.email.value ?? '';
      const password = this.registerForm.controls.password.value ?? '';
      const nickname = this.registerForm.controls.nickname.value ?? '';

      const { error, data } = await this.supabase.singUp(
        email,
        password,
        nickname
      );
      if (error) {
        this.status = 'error';
        this.errorMessage = error.message;
        return;
      }

      this.supabase.setSession(data.session);

      console.log(data.user);

      this.apollo
        .addUser(nickname, email, data.user?.id ?? '')
        .pipe(
          catchError(async error => {
            this.status = 'error';
            if (error instanceof Error) {
              throw new Error(error.message);
            } else {
              throw new Error('Something went wrong!');
            }
          })
        )
        .subscribe(data => console.log(data));

      if (this.status !== 'loading') {
        return;
      }

      this.status = 'ok';
      this.router.navigate(['']).then(err => console.log(err));
    } catch (error) {
      if (error instanceof Error) {
        this.errorMessage = error.message;
      }
      this.status = 'error';
    } finally {
      this.registerForm.reset();
      this.showToast = true;

      this.timeoutCleaner = setTimeout(() => {
        this.showToast = false;
      }, 5000);
    }
  }
}
