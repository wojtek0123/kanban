import { Routes } from '@angular/router';
import { BoardService } from './services/board.service';

export const boardRoutes: Routes = [
  {
    path: ':id',
    loadComponent: () => import('./board.component').then(c => c.BoardComponent),
    providers: [BoardService],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
