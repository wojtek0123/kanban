import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgIf } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

export type FormStatus = 'idle' | 'loading' | 'error' | 'ok';

@Component({
  selector: 'app-home',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, LoginComponent, RegisterComponent, RouterOutlet],
})
export class AuthComponent implements OnInit {
  private router = inject(Router);

  async ngOnInit() {
    await this.router.navigate(['/auth/sign-in']);
  }
}
