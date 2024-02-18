import { Routes } from '@angular/router';
import { ProjectComponent } from './project.component';

export const projectRoutes: Routes = [
  {
    path: 'board/:id',
    component: ProjectComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
