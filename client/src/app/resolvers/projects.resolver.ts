import { ResolveFn } from '@angular/router';
import { Project } from '../models/project.model';
import { inject } from '@angular/core';
import { ApolloService } from '../services/apollo/apollo.service';
import { map } from 'rxjs';

export const projectsResolver: ResolveFn<Project[]> = () => {
  return inject(ApolloService)
    .getProjects()
    .pipe(map(data => data.data.projects));
};
