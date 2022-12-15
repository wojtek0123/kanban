import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Board } from '../board.component';
import { BoardService } from '../board.service';
import { FormService, FormType } from '../form/form.service';
import { Subscription } from 'rxjs';
import { SupabaseService } from 'src/app/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css'],
})
export class BoardDetailsComponent implements OnInit, OnDestroy {
  selectedBoard!: Board | undefined;
  subscription = new Subscription();

  constructor(
    private formService: FormService,
    private boardService: BoardService,
    private supabase: SupabaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.boardService.selectedBoard.subscribe(
      board => (this.selectedBoard = board)
    );
  }

  onForm(type: FormType, columnId?: string, taskId?: string) {
    this.formService.onChangeFormVisibility(type);
    if (columnId) {
      this.boardService.onChangeSelectedColumnId(columnId);
    }
    if (taskId) {
      this.boardService.onChangeSelectedTaskId(taskId);
    }
  }

  async onLogout() {
    try {
      const { error } = await this.supabase.signOut();
      if (error) {
        console.error(error.message);
      }
      this.router.navigate(['/home']);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
