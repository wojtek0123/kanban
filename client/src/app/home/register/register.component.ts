import { Component } from '@angular/core';
import { SupabaseService } from '../../supabase.service';
import { FormBuilder, Validators } from '@angular/forms';
import { formStatus } from '../home.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  showToast = false;
  status: formStatus = 'ok';
  isSubmitted = false;
  errorMessage = '';
  timeoutCleaner: NodeJS.Timeout | null = null;

  registerForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    nickname: ['', [Validators.maxLength(25), Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
  });

  constructor(private supabase: SupabaseService, private fb: FormBuilder) {}

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

  async onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isSubmitted = true;
    this.status = 'loading';

    try {
      const { error } = await this.supabase.singUp(
        this.registerForm.controls.email.value ?? '',
        this.registerForm.controls.password.value ?? '',
        this.registerForm.controls.nickname.value ?? ''
      );
      if (!error) {
        this.status = 'ok';
      }
      if (error) {
        this.status = 'error';
        this.errorMessage = error.message;
      }
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
