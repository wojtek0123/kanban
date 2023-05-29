import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardFormComponent } from './board-form.component';
import { AutoFocusModule } from 'src/app/directives/auto-focus.module';

@NgModule({
  declarations: [BoardFormComponent],
  imports: [CommonModule, ReactiveFormsModule, AutoFocusModule],
  exports: [BoardFormComponent],
})
export class BoardFormModule {}
