import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormService } from '../services/form.service';
import { Observable, of } from 'rxjs';
import { BoardService } from '../services/board.service';
import { FormType } from '../models/types';
import { ApolloService } from '../services/apollo.service';
import { catchError, ignoreElements, map } from 'rxjs/operators';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  projects$: Observable<Project[]> | null = null;
  projectsError$: Observable<string> | null = null;

  constructor(
    public formService: FormService,
    private boardService: BoardService,
    private apollo: ApolloService
  ) {}

  ngOnInit(): void {
    this.projects$ = this.apollo
      .getProjects()
      .pipe(map(data => data.data.projects));

    this.projectsError$ = this.projects$.pipe(
      ignoreElements(),
      catchError(error => of(error))
    );
  }
}
