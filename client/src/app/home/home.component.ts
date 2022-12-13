import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  user = {
    email: '',
    password: '',
  };
  isRegister = true;
  status: 'loading' | 'error' | 'ok' = 'ok';

  constructor(
    private router: Router,
    private readonly supabase: SupabaseService
  ) {}

  toggle() {
    this.isRegister = !this.isRegister;
  }

  async onSubmit(x: NgForm) {
    const randomNumber = Math.random();
    if (this.isRegister) {
      this.status = 'loading';
      try {
        const { data, error } = await this.supabase.signIn(
          this.user.email,
          this.user.password
        );
        if (!error) {
          this.status = 'ok';
          const { data: sessionData, error: sessionError } =
            await this.supabase.getSession();

          this.supabase.session = sessionData.session;
          this.router.navigate(['']).then(error => console.log(error));
        } else {
          this.status = 'error';
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
        this.status = 'error';
      }
    }
    if (!this.isRegister) {
      try {
        this.status = 'loading';
        const { data, error } = await this.supabase.singUp(
          this.user.email,
          this.user.password
        );
        if (!error) {
          this.status = 'ok';
          this.router
            .navigate([data.user?.id])
            .then(error => console.log(error));
        } else {
          this.status = 'error';
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
          this.status = 'error';
        }
      }
      // this.router.navigate([randomNumber]).then(error => console.log(error));
    }
  }
}
