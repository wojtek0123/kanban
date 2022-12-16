import { Component, OnDestroy, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { FormService } from './form/form.service';
import { Subscription } from 'rxjs';
import { BoardService } from './board.service';
import { GET_PROJECTS } from '../graphql.schema';
import { SupabaseService } from '../supabase.service';
import { Project, FormType } from '../types';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit, OnDestroy {
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
    this.projectsQuery = this.apollo.watchQuery<{ projects: Project[] }>({
      query: GET_PROJECTS,
      variables: {
        userId: this.userId,
      },
    });

    this.subscription = this.projectsQuery.valueChanges.subscribe(result => {
      this.projects = result.data.projects;

      if (this.boardService.selectedBoard.value) {
        this.updateSelectedBoard();
        return;
      }

      const projectsWithBoards: Project[] = result.data.projects.filter(
        (project: Project) => project.boards[0]
      );
      if (projectsWithBoards.length === 0) return;
      this.boardService.onChangeSelectedBoard(projectsWithBoards[0].boards[0]);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateSelectedBoard() {
    const boardId = this.boardService.selectedBoard.value?.id ?? '';

    const boards = this.projects.map(project =>
      project.boards.filter(board => board.id === boardId)
    );
    const board = boards.filter(board => board.length !== 0);
    this.boardService.selectedBoard.next(board[0][0]);
  }

  onForm(type: FormType, columnId?: string) {
    this.formService.onChangeFormVisibility(type);
    if (columnId) {
      this.boardService.onChangeSelectedColumnId(columnId);
    }
  }
}
