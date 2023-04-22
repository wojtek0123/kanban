import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../models/project.model';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects$ = new Observable<Project[]>();
  columns = ['Name', 'Columns', 'Tasks', 'Subtasks'];
  loggedInUserId$ = new Observable<string>();

  constructor(
    private _route: ActivatedRoute,
    private _supabase: SupabaseService
  ) {}

  ngOnInit() {
    this.projects$ = this._route.data.pipe(map(data => data['projects']));

    this.loggedInUserId$ = this._supabase.session$.pipe(
      map(session => session?.user.id ?? '')
    );
  }
}
