import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, switchMap } from 'rxjs';
import { GET_BOARD_CONTENT } from 'src/app/graphql/queries/get-board-content.query';
import { GET_BOARD_NAME_AND_TAGS } from 'src/app/graphql/queries/get-board-name-and-tags.query';
import { CHANGE_COLUMN_ORDER } from 'src/app/graphql/mutations/change-column-order.mutation';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
import { Column } from 'src/app/models/column.model';

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
      switchMap(
        userId =>
          this.apollo.watchQuery({
            query: GET_BOARD_CONTENT,
            variables: { userId: userId ?? '', boardId },
            pollInterval: 100,
          }).valueChanges
      )
    );
  }

  changeColumnOrder$(columns: Column[]) {
    const ids = columns.map(c => c.id);
    const orders = columns.map(c => c.order);
    return this.apollo
      .mutate({
        mutation: CHANGE_COLUMN_ORDER,
        variables: { columnIds: ids, orders },
        // optimisticResponse: {
        //   changeColumnOrder: [...columns],
        // },
        // update: store => {
        //   const data = store.readQuery({
        //     query: GET_BOARD_CONTENT,
        //     variables: {
        //       userId: 'b2f22729-9d0c-434e-891a-6a0bd778b539',
        //       boardId: '2bfc59da-ff9c-4c18-9a1e-5c8582e4b5d2',
        //     },
        //   });
        //   console.log(data);
        //   if (!data) return;
        //
        //   store.writeQuery({
        //     query: GET_BOARD_CONTENT,
        //     data: {
        //       ...data,
        //       board: {
        //         ...data.board,
        //         columns,
        //       },
        //     },
        //   });
        // },
      })
      .pipe(map(res => res.data?.changeColumnOrder));
  }
}
