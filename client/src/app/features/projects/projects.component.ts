import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../../models/project.model';
import { catchError, ignoreElements, map } from 'rxjs/operators';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
import { ApolloService } from 'src/app/services/apollo/apollo.service';
import { Board } from 'src/app/models/board.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects$ = new Observable<Project[]>();
  projectsError$ = new Observable<string>();
  columns = ['Name', 'Columns', 'Tasks', 'Subtasks'];
  loggedInUserId$ = new Observable<string>();

  constructor(
    private _apollo: ApolloService,
    private _supabase: SupabaseService
  ) {}

  ngOnInit() {
    this.projects$ = this._apollo.getProjects();

    this.projectsError$ = this.projects$.pipe(
      ignoreElements(),
      catchError(error => of(error))
    );

    this.loggedInUserId$ = this._supabase.session$.pipe(
      map(session => session?.user.id ?? '')
    );
  }

  projectTrackBy(_index: number, project: Project) {
    return project.id;
  }

  boardTrackBy(_index: number, board: Board) {
    return board.id;
  }
}
