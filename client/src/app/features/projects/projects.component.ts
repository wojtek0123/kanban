import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../models/project.model';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects$ = new Observable<Project[]>();
  columns = ['Name', 'Columns', 'Tasks', 'Subtasks'];

  constructor(private _route: ActivatedRoute) {}

  ngOnInit() {
    this.projects$ = this._route.data.pipe(map(data => data['projects']));
  }
}
