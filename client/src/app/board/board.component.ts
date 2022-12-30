import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormService } from './form/form.service';
import { Observable, Subscription } from 'rxjs';
import { BoardService } from './board.service';
import { Project, FormType } from '../types';
import { ApolloService } from './apollo.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  data: Observable<{ projects: Project[] }> | undefined = undefined;
  isLoading = true;

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
          if (data.projects.length === 0) {
            return;
          }
          if (!this.boardService.selectedBoard.value) {
            const project = data.projects.filter(board => board.boards.at(0));
            this.boardService.onChangeSelectedProjectId(
              project?.at(0)?.id ?? ''
            );

            return project?.at(0)?.boards.at(0);
          } else {
            const project = data.projects.filter(
              project =>
                project.id === this.boardService.selectedProjectId.value
            );

            return project
              ?.at(0)
              ?.boards.find(
                board =>
                  board.id === this.boardService.selectedBoard.value?.id ?? ''
              );
          }
        })
      )
      .subscribe(board => {
        this.boardService.onChangeSelectedBoard(board);
        this.isLoading = false;
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
