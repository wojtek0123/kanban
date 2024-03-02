import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, ignoreElements, map, switchMap } from 'rxjs/operators';
import { ApolloService } from '../../../../services/apollo/apollo.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { ContextMenuComponent } from '../../../../components/context-menu/context-menu.component';
import { FilterMenuComponent } from '../../../../components/filter-menu/filter-menu.component';
import { LogoutButtonComponent } from '../../../../components/logout-button/logout-button.component';
import { OpenFormButtonComponent } from '../../../../components/open-form-button/open-form-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskTableComponent } from '../../../../components/tasks-table-view/tasks-table-view.component';
import { TasksComponent } from '../../../../components/tasks-kanban-view/tasks-kanban-view.component';
import { SortBy } from '../../../../models/types';
import { ActionsComponent } from '../../../../shared/components/actions/actions.component';
import { of } from 'rxjs';
import { LoadingSpinnerComponent } from 'src/app/components/loading-spinner/loading-spinner.component';
import { Tag } from 'src/app/models/tag.interface';

type BoardTypes = 'kanban' | 'table';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
  standalone: true,
  imports: [
    AsyncPipe,
    ContextMenuComponent,
    FilterMenuComponent,
    LogoutButtonComponent,
    NgIf,
    OpenFormButtonComponent,
    ReactiveFormsModule,
    TaskTableComponent,
    TasksComponent,
    FormsModule,
    ActionsComponent,
    LoadingSpinnerComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  private route = inject(ActivatedRoute);
  private apollo = inject(ApolloService);

  board$ = this.route.params.pipe(
    map(params => params['id']),
    switchMap(boardId => this.apollo.getBoard(boardId))
  );
  boardError$ = this.board$.pipe(
    ignoreElements(),
    catchError(err => of(err))
  );

  tags$ = this.board$.pipe(map(board => board.columns.flatMap(column => column.tasks.flatMap(task => task.tags))));

  sortBy: SortBy = {
    column: 'title',
    direction: 'asc',
  };
  boardType: BoardTypes = 'kanban';
  checkedTags = signal<Tag[]>([]);
  searchTerm = '';

  changeSelection(tags: Tag[]) {
    this.checkedTags.set(tags);
  }
}
