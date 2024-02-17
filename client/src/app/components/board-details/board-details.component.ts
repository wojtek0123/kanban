import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { SortBy } from '../../models/types';
import { Board } from '../../models/board.model';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ApolloService } from '../../services/apollo/apollo.service';
import { FormService } from 'src/app/services/form/form.service';
import { GetTagsFromTasksPipe } from '../../pipes/get-tags-from-tasks/get-tags-from-tasks.pipe';
import { TaskTableComponent } from '../tasks-table-view/tasks-table-view.component';
import { TasksComponent } from '../tasks-kanban-view/tasks-kanban-view.component';
import { FilterMenuComponent } from '../filter-menu/filter-menu.component';
import { FormsModule } from '@angular/forms';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { OpenFormButtonComponent } from '../open-form-button/open-form-button.component';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import { NgIf, AsyncPipe } from '@angular/common';

type BoardTypes = 'kanban' | 'table';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    ContextMenuComponent,
    OpenFormButtonComponent,
    LogoutButtonComponent,
    FormsModule,
    FilterMenuComponent,
    TasksComponent,
    TaskTableComponent,
    AsyncPipe,
    GetTagsFromTasksPipe,
  ],
})
export class BoardDetailsComponent implements OnInit {
  isOwner$ = new Observable();
  searchTerm = '';
  checkedTags: string[] = [];
  @Input() board: Board | undefined | null = null;
  @Input() ownerProjectId: string = '';
  usersInTheProject$: Observable<{ user: User }[]> | null = null;
  boardType: BoardTypes = 'table';
  sortBy: SortBy = {
    column: 'title',
    direction: 'asc',
  };

  constructor(
    private route: ActivatedRoute,
    private apollo: ApolloService,
    public formService: FormService
  ) {}

  ngOnInit() {
    const params$ = this.route.params;

    this.usersInTheProject$ = params$.pipe(
      map(params => params['projectId']),
      switchMap(projectId => this.apollo.getUsersFromProject(projectId))
    );

    if (window.innerWidth > 1024) {
      this.boardType = 'kanban';
    }
  }

  onSelectedTags(checkedTags: string[]) {
    this.checkedTags = checkedTags;
  }
}
