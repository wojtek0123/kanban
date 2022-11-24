import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { FormService, FormType } from './form/form.service';
import { Subscription } from 'rxjs';
import { BoardService } from './board.service';
import { GET_PROJECTS } from '../graphql/graphql.schema';

export interface Subtask {
  id: string;
  name: string;
  isFinished: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  tags: string[];
  subtasks: Subtask[];
}

export interface Column {
  id: string;
  name: string;
  tasks: Task[];
}

export interface Board {
  id: string;
  name: string;
  columns: Column[];
}

export interface Project {
  id: string;
  name: string;
  boards: Board[];
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit, OnDestroy {
  // projects: Project[] = [];
  projectsQuery!: QueryRef<any>;
  boardsSub!: Subscription;

  constructor(
    private apollo: Apollo,
    public formService: FormService,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.projectsQuery = this.apollo.watchQuery<{ projects: Project[] }>({
      query: GET_PROJECTS,
    });

    this.boardsSub = this.projectsQuery.valueChanges.subscribe(result =>
      this.boardService.onSetProjects(result.data.projects)
    );
  }

  // ngDoCheck(): void {
  //   this.boardService.onChangeSelectedBoard(
  //     this.boardService.selectedBoardId.value
  //   );
  // }

  ngOnDestroy(): void {
    this.boardsSub.unsubscribe();
  }

  onForm(type: FormType, columnId?: string) {
    this.formService.onChangeFormVisibility(type);
    if (columnId) {
      this.boardService.onChangeSelectedColumn(columnId);
    }
  }
}
