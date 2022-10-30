import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoardsService } from './boards.service';
import { FormAddTaskService, FormType } from './form/form.service';
import { Board } from './boards.service';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { GET_BOARDS } from './graphql/graphql.queries';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  boards: Board[] = [];
  selectedBoard!: Board;
  selectedBoardSub: Subscription = new Subscription();
  showContextMenu = false;
  showMobileNav = false;
  selectedColumn = '';

  constructor(
    public formAddTaskService: FormAddTaskService,
    private boardsService: BoardsService,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    // this.boards = this.boardsService.boards;
    this.selectedBoardSub = this.boardsService.selectedBoard.subscribe(
      board => (this.selectedBoard = board)
    );
    this.apollo
      .watchQuery({ query: GET_BOARDS })
      .valueChanges.subscribe((result: any) => {
        console.log(result.data);
        this.boards = result.data.Boards;
        this.boardsService.boards = result.data.Boards;
      });
  }

  ngOnDestroy(): void {
    this.selectedBoardSub.unsubscribe();
  }

  onOpenForm(formType: FormType, event: Event) {
    const value = (event.target as HTMLButtonElement).previousSibling
      ?.textContent;
    if (value) {
      this.boardsService.onChangeSelectedColumn(value);
    }
    this.formAddTaskService.onChangeFormVisibility(formType);
  }

  onOpenMenu(event: Event) {
    this.showContextMenu = !this.showContextMenu;
    const value = (event.target as HTMLButtonElement).parentElement
      ?.previousSibling?.textContent;
    console.log(value);
    if (!value) return;
    this.selectedColumn = value;
  }

  onMobileNav() {
    this.showMobileNav = !this.showMobileNav;
  }

  onSelectBoard(event: Event) {
    const value = (event.target as HTMLButtonElement).textContent
      ?.toLowerCase()
      .trim();
    if (!value) {
      return;
    }
    this.boardsService.onChangeSelectedBoard(value);
    this.selectedBoardSub = this.boardsService.selectedBoard.subscribe(
      board => (this.selectedBoard = board)
    );
  }

  onChangeColumnName(event: Event) {
    const value = (event.target as HTMLButtonElement).parentNode
      ?.previousSibling?.previousSibling;
    console.log(value);
    // this.boardsService.onChangeColumnName();
    this.showContextMenu = !this.showContextMenu;
  }

  onRemoveColumn() {
    this.boardsService.onRemoveColumn(this.selectedColumn);
    this.showContextMenu = !this.showContextMenu;
  }
}
