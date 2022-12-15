import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { FormService, FormType } from './form/form.service';
import { Subscription } from 'rxjs';
import { BoardService } from './board.service';
import { GET_PROJECTS } from '../graphql.schema';
import { SupabaseService } from '../supabase.service';

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
  subscription!: Subscription;
  userId: string = '';

  constructor(
    private apollo: Apollo,
    public formService: FormService,
    private boardService: BoardService,
    private supabase: SupabaseService
  ) {}

  async ngOnInit(): Promise<void> {
    const { data, error } = await this.supabase.getSession();

    if (error) {
      console.error('ERROR');
      return;
    }

    this.userId = data.session?.user.id ?? '';
    console.log(this.userId);
    this.projectsQuery = this.apollo.watchQuery<{ projects: Project[] }>({
      query: GET_PROJECTS,
      variables: {
        userId: this.userId,
      },
    });

    this.subscription = this.projectsQuery.valueChanges.subscribe(result => {
      this.projects = result.data.projects;
      if (
        result.data.projects.length === 0 ||
        this.boardService.selectedBoardId.value
      ) {
        return;
      }
      this.boardService.onChangeSelectedBoard(
        result.data.projects[0].boards[0]
      );
      this.boardService.selectedBoardId.next(
        result.data.projects[0].boards[0]?.id
      );
    });
  }

  ngDoCheck(): void {
    const boards = this.projects.map(project =>
      project.boards.find(
        board => board.id === this.boardService.selectedBoardId.value
      )
    );

    const board = boards.find(
      board => board?.id === this.boardService.selectedBoardId.value
    );
    if (board) {
      this.boardService.onChangeSelectedBoard(board);
    }
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
