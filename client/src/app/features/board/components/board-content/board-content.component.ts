import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, ignoreElements, map, of, switchMap } from 'rxjs';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-board-content',
  templateUrl: './board-content.component.html',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardContentComponent {
  private boardService = inject(BoardService);
  private route = inject(ActivatedRoute);

  boardContent$ = this.route.params.pipe(
    map(params => params['id']),
    switchMap(boardId => this.boardService.getBoardContent$(boardId))
  );

  boardContentError$ = this.boardContent$.pipe(
    ignoreElements(),
    catchError(err => of(err))
  );
}
