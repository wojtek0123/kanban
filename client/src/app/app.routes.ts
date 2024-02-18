import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { BoardComponent } from './features/board/board.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'projects',
        loadChildren: () =>
          import('./features/projects/projects.routes').then(m => m.routes),
      },
      {
        path: 'project/:projectId/board/:boardId',
        loadComponent: () =>
          import('./features/board/board.component').then(
            c => c.BoardComponent
          ),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(f => f.authRoutes),
  },
  { path: '**', redirectTo: '/' },
];
