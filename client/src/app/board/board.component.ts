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
export class BoardComponent implements OnInit, OnDestroy, DoCheck {
  projects: Project[] = [];
  projectsQuery!: QueryRef<any>;
  boardsSub!: Subscription;
  selectedBoard: Board | undefined;
  selectedProject: Project | undefined;

  constructor(
    private apollo: Apollo,
    public formService: FormService,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.projectsQuery = this.apollo.watchQuery<{ projects: Project[] }>({
      query: GET_PROJECTS,
    });

    this.boardsSub = this.projectsQuery.valueChanges.subscribe(result => {
      this.projects = result.data.projects;
      console.log(result.data);
      // if (!this.selectedBoard) {
      //   this.selectedProject = result.data.projects[0];
      //   this.boardService.onChangeSelectedProject(
      //     this.selectedProject?.id ?? ''
      //   );
      // } else {
      //   this.boardService.onChangeSelectedProject(
      //     this.selectedProject?.id ?? ''
      //   );
      // }
    });
  }

  ngDoCheck(): void {
    if (
      this.selectedBoard?.id !== this.boardService.selectedBoardId.value &&
      this.projects.length !== 0
    ) {
      this.boardService.selectedBoardId.subscribe(id => {
        this.selectedBoard = this.projects[0].boards.find(
          board => board.id === id
        );
      });
    }
  }

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
