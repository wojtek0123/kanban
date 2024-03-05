import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(f => f.authRoutes),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'projects',
  },
  {
    path: 'projects',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/projects/projects.routes').then(m => m.routes),
  },
  {
    path: 'board',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/board/board.routes').then(r => r.boardRoutes),
  },
  { path: '**', redirectTo: 'projects' },
];
