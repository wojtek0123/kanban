import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatestWith, map, switchMap, tap } from 'rxjs/operators';
import { ApolloService } from '../../../../services/apollo/apollo.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { ContextMenuComponent } from '../../../../components/context-menu/context-menu.component';
import { FilterMenuComponent } from '../../../../components/filter-menu/filter-menu.component';
import { GetTagsFromTasksPipe } from '../../../../pipes/get-tags-from-tasks/get-tags-from-tasks.pipe';
import { LogoutButtonComponent } from '../../../../components/logout-button/logout-button.component';
import { OpenFormButtonComponent } from '../../../../components/open-form-button/open-form-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskTableComponent } from '../../../../components/tasks-table-view/tasks-table-view.component';
import { TasksComponent } from '../../../../components/tasks-kanban-view/tasks-kanban-view.component';
import { SortBy } from '../../../../models/types';

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
    GetTagsFromTasksPipe,
    LogoutButtonComponent,
    NgIf,
    OpenFormButtonComponent,
    ReactiveFormsModule,
    TaskTableComponent,
    TasksComponent,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private apollo = inject(ApolloService);

  board$ = this.route.queryParams.pipe(
    map(queryParams => queryParams['projectId']),
    combineLatestWith(this.route.params),
    switchMap(([projectId, params]) =>
      this.apollo.getProject(projectId, params['id'])
    ),
    map(project => project.boards[0]),
    tap(data => console.log(data))
  );

  sortBy: SortBy = {
    column: 'title',
    direction: 'asc',
  };
  boardType: BoardTypes = 'table';
  checkedTags: string[] = [];
  searchTerm = '';

  ngOnInit() {
    console.log('here');
  }

  onSelectedTags(checkedTags: string[]) {
    this.checkedTags = checkedTags;
  }
}
