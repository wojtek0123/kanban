import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SortBy } from '../../models/types';
import { Board } from '../../models/board.model';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
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
  selectedBoard$: Observable<Board> | null = null;
  usersInTheProject$: Observable<{ user: User }[]> | null = null;
  boardType: BoardTypes = 'kanban';
  sortBy: SortBy = {
    column: 'title',
    direction: 'asc',
  };

  constructor(private route: ActivatedRoute, private apollo: ApolloService) {}

  ngOnInit() {
    const params$ = this.route.params;

    this.selectedBoard$ = params$.pipe(
      map(data => data['boardId']),
      switchMap(boardId => this.apollo.getBoard(boardId)),
      map(data => data.data.board)
    );

    this.selectedBoard$
      .pipe(
        map(board => board.Project.userId),
        take(1)
      )
      .subscribe(ownerId => this.apollo.setProjectOwnerId(ownerId));

    this.isOwner$ = this.apollo.isLoggedInUserAOwnerOfTheProject$;

    this.usersInTheProject$ = params$.pipe(
      map(params => params['projectId']),
      switchMap(projectId => this.apollo.getUsersFromProject(projectId)),
      map(response => response.data.usersFromProject)
    );
  }

  onSelectedTags(checkedTags: string[]) {
    this.checkedTags = checkedTags;
  }
}
