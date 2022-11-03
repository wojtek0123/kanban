import { NgModule } from '@angular/core';
import { AccordionComponent } from './accordion/accordion.component';
import { BoardComponent } from './board.component';
import { FormComponent } from './form/form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FormComponent, BoardComponent, AccordionComponent],
  imports: [BrowserAnimationsModule, ReactiveFormsModule, CommonModule],
  exports: [BoardComponent],
})
export class BoardModule {}
