import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'sign-in',
        loadComponent: () =>
          import('./features/login/login.component').then(
            c => c.LoginComponent
          ),
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./features/register/register.component').then(
            c => c.RegisterComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'sign-in',
  },
];
