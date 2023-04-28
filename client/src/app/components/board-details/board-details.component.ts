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

type BoardTypes = 'kanban' | 'table';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardDetailsComponent implements OnInit {
  isOwner$ = new Observable();
  searchTerm = '';
  checkedTags: string[] = [];
  @Input() board: Board | undefined | null = null;
  @Input() ownerProjectId: string = '';
  usersInTheProject$: Observable<{ user: User }[]> | null = null;
  boardType: BoardTypes = 'kanban';
  sortBy: SortBy = {
    column: 'title',
    direction: 'asc',
  };

  constructor(private route: ActivatedRoute, private apollo: ApolloService) {}

  ngOnInit() {
    const params$ = this.route.params;

    this.usersInTheProject$ = params$.pipe(
      map(params => params['projectId']),
      switchMap(projectId => this.apollo.getUsersFromProject(projectId))
    );
  }

  onSelectedTags(checkedTags: string[]) {
    this.checkedTags = checkedTags;
  }
}
