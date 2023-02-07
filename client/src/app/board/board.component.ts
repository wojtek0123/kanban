import { Component, OnInit } from '@angular/core';
import { FormService } from '../services/form.service';
import { Observable, combineLatest } from 'rxjs';
import { BoardService } from '../services/board.service';
import { FormType, Status } from '../models/types';
import { Project } from '../models/project.model';
import { Board } from '../models/board.model';
import { ApolloService } from '../services/apollo.service';
import { catchError, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  projects$: Observable<Project[]> | null = null;
  status: Status = 'loading';
  selectedBoard$: Observable<Board | undefined> | null = null;

  constructor(
    public formService: FormService,
    private boardService: BoardService,
    private apollo: ApolloService
  ) {}

  ngOnInit(): void {
    this.projects$ = this.apollo.getProjects().pipe(
      catchError(error => {
        this.status = 'error';
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error('Something went wrong!');
        }
      }),
      map(data => data.data.projects),
      tap(() => (this.status = 'ok'))
    );

    this.projects$
      ?.pipe(
        map(data => data.filter(project => project.boards.length !== 0).at(0)),
        take(1)
      )
      .subscribe(project => {
        if (!project) return;
        this.boardService.onChangeSelectedProject(project);
        this.boardService.onChangeSelectedBoard(project.boards.at(0));
      });

    const projectId$ = this.boardService.selectedProject.pipe(
      map(data => data?.id)
    );

    const boardId$ = this.boardService.selectedBoard.pipe(
      map(data => data?.id)
    );

    const selectedProject$ = combineLatest([this.projects$, projectId$]).pipe(
      map(([projects, projectId]) =>
        projects.filter(project => project.id === projectId).at(0)
      )
    );

    this.selectedBoard$ = combineLatest([selectedProject$, boardId$]).pipe(
      map(([project, boardId]) =>
        project?.boards.filter(board => board.id === boardId).at(0)
      )
    );
  }

  onForm(type: FormType, columnId?: string) {
    this.formService.onChangeFormVisibility(type);
    if (columnId) {
      this.boardService.onChangeSelectedColumnId(columnId);
    }
  }
}
