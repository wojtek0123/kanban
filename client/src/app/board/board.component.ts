import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormService } from '../services/form.service';
import { Subject } from 'rxjs';
import { BoardService } from '../services/board.service';
import { FormType, Status } from '../models/types';
import { ApolloService } from '../services/apollo.service';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit, OnDestroy {
  status: Status = 'loading';
  destroy$ = new Subject<void>();

  constructor(
    public formService: FormService,
    private boardService: BoardService,
    private apollo: ApolloService
  ) {}

  ngOnInit(): void {
    this.apollo
      .getProjects()
      .pipe(
        catchError(error => {
          this.status = 'error';
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error('Something went wrong!');
          }
        }),
        takeUntil(this.destroy$),
        map(data => data.data.projects)
      )
      .subscribe(data => {
        this.status = 'ok';
        this.boardService.onSetProjects(data);
      });

    this.boardService.getSelectedProject
      .pipe(
        takeUntil(this.destroy$),
        map(project => project?.id ?? ''),
        switchMap(projectId => this.apollo.getUsersFromProject(projectId)),
        map(data => data.data.usersFromProject)
      )
      .subscribe(data => this.boardService.onSetUsersInTheProject(data));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onForm(type: FormType, columnId?: string) {
    this.formService.onChangeFormVisibility(type);
    if (columnId) {
      this.boardService.onChangeSelectedColumnId(columnId);
    }
  }
}
