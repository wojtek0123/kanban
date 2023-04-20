import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { ApolloService } from '../services/apollo/apollo.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects$ = new Observable<Project[]>();
  columns = ['Name', 'Columns', 'Tasks', 'Subtasks'];

  constructor(private apollo: ApolloService) {}

  ngOnInit() {
    this.projects$ = this.apollo
      .getProjects()
      .pipe(map(data => data.data.projects));
  }
}
