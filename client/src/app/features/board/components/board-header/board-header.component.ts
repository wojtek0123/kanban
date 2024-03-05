import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, ignoreElements, map, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActionsComponent } from 'src/app/shared/components/actions/actions.component';
import { FilterMenuComponent } from 'src/app/components/filter-menu/filter-menu.component';
import { LogoutButtonComponent } from 'src/app/components/logout-button/logout-button.component';
import { OpenFormButtonComponent } from 'src/app/components/open-form-button/open-form-button.component';
import { FormsModule } from '@angular/forms';
import { SortBy } from 'src/app/models/types';
import { TagBase } from 'src/app/graphql/queries/get-board-name-and-tags.query';
import { LoadingSpinnerComponent } from '../../../../components/loading-spinner/loading-spinner.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    ActionsComponent,
    FilterMenuComponent,
    LogoutButtonComponent,
    OpenFormButtonComponent,
    FormsModule,
    LoadingSpinnerComponent,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class BoardHeaderComponent implements OnInit {
  private boardService = inject(BoardService);
  private route = inject(ActivatedRoute);

  boardNameAndTags$ = this.route.params.pipe(
    map(params => params['id']),
    switchMap(boardId => this.boardService.getBoardNameAndTags$(boardId))
  );

  boardNameAndTagsError$ = this.boardNameAndTags$.pipe(
    ignoreElements(),
    catchError(err => of(err))
  );

  tags$ = this.boardNameAndTags$.pipe(
    map(board => board.columns.flatMap(column => column.tasks.flatMap(task => task.tags)))
  );

  sortBy: SortBy = {
    column: 'title',
    direction: 'asc',
  };
  checkedTags = signal<TagBase[]>([]);
  searchTerm = '';

  ngOnInit(): void {
    this.route.params.subscribe(() => {});
  }

  changeSelection(tags: TagBase[]) {
    this.checkedTags.set(tags);
  }
}
