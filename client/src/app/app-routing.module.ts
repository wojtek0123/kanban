import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { BoardComponent } from './features/board/board.component';
import { AuthGuard } from './guards/auth.guard';
import { ProjectsComponent } from './features/projects/projects.component';
import { projectsResolver } from './resolvers/projects.resolver';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    resolve: { projects: projectsResolver },
    children: [
      {
        path: '',
        component: ProjectsComponent,
      },
      {
        path: 'project/:projectId/board/:boardId',
        component: BoardComponent,
      },
    ],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
