import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { ApolloService } from '../services/apollo.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]> | null = null;

  constructor(private apollo: ApolloService) {}

  ngOnInit() {
    this.projects$ = this.apollo
      .getProjects()
      .pipe(map(data => data.data.projects));
  }
}
