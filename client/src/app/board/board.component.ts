import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormService } from './form/form.service';
import { Observable, Subscription } from 'rxjs';
import { BoardService } from './board.service';
import { Project, FormType, Status } from '../types';
import { ApolloService } from './apollo.service';
import { catchError, map } from 'rxjs/operators';
import { ApolloQueryResult } from '@apollo/client/core/types';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  data: Observable<ApolloQueryResult<{ projects: Project[] }>> | undefined =
    undefined;
  status: Status = 'loading';

  constructor(
    public formService: FormService,
    private boardService: BoardService,
    private apollo: ApolloService
  ) {}

  ngOnInit(): void {
    this.data = this.apollo.getProjects();

    this.subscription = this.data
      .pipe(
        map(data => {
          if (data.data.projects.length === 0) {
            return;
          }
          if (!this.boardService.selectedBoard.value) {
            const project = data.data.projects.filter(board =>
              board.boards.at(0)
            );
            this.boardService.onChangeSelectedProjectId(
              project?.at(0)?.id ?? ''
            );

            return { project: project?.at(0)?.boards.at(0), error: data.error };
          } else {
            const project = data.data.projects.filter(
              project =>
                project.id === this.boardService.selectedProjectId.value
            );

            return {
              project: project
                ?.at(0)
                ?.boards.find(
                  board =>
                    board.id === this.boardService.selectedBoard.value?.id ?? ''
                ),
              error: data.error,
            };
          }
        }),
        catchError(async error => {
          this.status = 'error';
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error('Something went wrong!');
          }
        })
      )
      .subscribe(board => {
        this.boardService.onChangeSelectedBoard(board?.project);
        this.status = 'ok';
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onForm(type: FormType, columnId?: string) {
    this.formService.onChangeFormVisibility(type);
    if (columnId) {
      this.boardService.onChangeSelectedColumnId(columnId);
    }
  }
}
