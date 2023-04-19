import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { BoardComponent } from './board/board.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'projects',
        component: ProjectsComponent,
      },
      {
        path: 'project/:projectId/board/:boardId',
        component: BoardComponent,
      },
    ],
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
