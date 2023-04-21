import { NgModule } from '@angular/core';
import { BoardComponent } from '../../features/board/board.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardFormComponent } from './board-form.component';

@NgModule({
  declarations: [BoardFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [BoardFormComponent],
})
export class BoardFormModule {}
