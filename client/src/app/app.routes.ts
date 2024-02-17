import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { BoardComponent } from './features/board/board.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/projects/projects.routes').then(m => m.routes),
      },
      {
        path: 'project/:projectId/board/:boardId',
        component: BoardComponent,
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  { path: '**', redirectTo: '/' },
];
