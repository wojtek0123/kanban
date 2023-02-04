import { Component, OnInit } from '@angular/core';
import { FormService } from './form/form.service';
import { Observable, combineLatest } from 'rxjs';
import { BoardService } from './board.service';
import { Project, FormType, Status } from '../types';
import { ApolloService } from './apollo.service';
import { catchError, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  projects$: Observable<Project[]> | null = null;
  status: Status = 'loading';

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
      map(data => data.data.projects)
    );

    const boardId$ = this.boardService.selectedBoard.pipe(
      map(data => data?.id)
    );

    const selectedProject$ = combineLatest([this.projects$, boardId$]).pipe(
      map(([projects, boardId]) =>
        boardId
          ? projects.filter(project =>
              project.boards.some(board => board.id === boardId)
            )
          : projects.filter(board => board.boards.at(0))
      )
    );

    selectedProject$
      .pipe(
        take(1),
        map(data => data.at(0))
      )
      .subscribe(project => {
        this.status = 'ok';
        this.boardService.onChangeSelectedProjectId(project?.id ?? '');
        this.boardService.onChangeSelectedProject(project ?? ({} as Project));
        this.boardService.onChangeSelectedBoard(project?.boards.at(0));
      });
  }

  onForm(type: FormType, columnId?: string) {
    this.formService.onChangeFormVisibility(type);
    if (columnId) {
      this.boardService.onChangeSelectedColumnId(columnId);
    }
  }
}
