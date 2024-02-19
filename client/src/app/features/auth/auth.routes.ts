import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./features/login/login.component').then(c => c.LoginComponent),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./features/register/register.component').then(
        c => c.RegisterComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'sign-in',
  },
];
