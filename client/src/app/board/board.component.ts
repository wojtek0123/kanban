import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormService } from './form/form.service';
import { Observable, Subscription } from 'rxjs';
import { BoardService } from './board.service';
import { Project, FormType, Board } from '../types';
import { ApolloService } from './apollo.service';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  data: Observable<{ projects: Project[] }> | undefined = undefined;
  userId: string = '';

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
          if (!this.boardService.selectedBoard.value) {
            const project = data.projects.filter(board => board.boards[0]);
            this.boardService.onChangeSelectedProjectId(project[0].id);

            return project[0].boards[0];
          } else {
            const project = data.projects.filter(
              project =>
                project.id === this.boardService.selectedProjectId.value
            );

            return project[0].boards.find(
              board =>
                board.id === this.boardService.selectedBoard.value?.id ?? ''
            );
          }
        })
      )
      .subscribe(board => {
        this.boardService.onChangeSelectedBoard(board);
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
