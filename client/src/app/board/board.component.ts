import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormService } from '../services/form/form.service';
import { Observable, Subject, combineLatest, of } from 'rxjs';
import { ApolloService } from '../services/apollo/apollo.service';
import { catchError, ignoreElements, map, takeUntil } from 'rxjs/operators';
import { Project } from '../models/project.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  projects$: Observable<Project[]> | null = null;
  projectsError$: Observable<string> | null = null;

  constructor(
    public formService: FormService,
    private apollo: ApolloService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const projectId$ = this.route.params.pipe(
      map(params => params['projectId'])
    );

    this.projects$ = this.apollo
      .getProjects()
      .pipe(map(data => data.data.projects));

    this.projectsError$ = this.projects$.pipe(
      ignoreElements(),
      catchError(error => of(error))
    );

    combineLatest([this.projects$, projectId$])
      .pipe(
        map(([projects, projectId]) =>
          projects.find(project => project.id === projectId)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(project => this.formService.onChangeProject(project));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
