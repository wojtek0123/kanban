import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'projects',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/projects/projects.routes').then(m => m.routes),
  },
  {
    path: 'project',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/project/project.routes').then(f => f.projectRoutes),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(f => f.authRoutes),
  },
  { path: '**', redirectTo: '/projects' },
];
