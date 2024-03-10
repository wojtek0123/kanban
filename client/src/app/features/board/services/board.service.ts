import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, switchMap } from 'rxjs';
import { GET_BOARD_CONTENT } from 'src/app/graphql/queries/get-board-content.query';
import { GET_BOARD_NAME_AND_TAGS } from 'src/app/graphql/queries/get-board-name-and-tags.query';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';

@Injectable()
export class BoardService {
  private userId$ = inject(SupabaseService).userId$();
  private apollo = inject(Apollo);

  getBoardNameAndTags$(boardId: string) {
    return this.userId$.pipe(
      switchMap(userId =>
        this.apollo
          .watchQuery({ query: GET_BOARD_NAME_AND_TAGS, variables: { userId: userId ?? '', boardId } })
          .valueChanges.pipe(map(res => res.data.board))
      )
    );
  }

  getBoardContent$(boardId: string) {
    return this.userId$.pipe(
      switchMap(userId =>
        this.apollo.query({ query: GET_BOARD_CONTENT, variables: { userId: userId ?? '', boardId } })
      ),
      map(res => res.data.board)
    );
  }
}
