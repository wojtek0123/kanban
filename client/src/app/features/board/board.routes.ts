import { Routes } from '@angular/router';
import { BoardDetailsComponent } from '../../components/board-details/board-details.component';

export const boardRoutes: Routes = [
  {
    path: 'project/:projectId/board/:id',
    component: BoardDetailsComponent,
  },
];
