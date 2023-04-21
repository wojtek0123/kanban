import { NgModule } from '@angular/core';
import { AccordionItemComponent } from './accordion-item.component';
import { CommonModule } from '@angular/common';
import { CollapseButtonModule } from '../collapse-button/collapse-button.module';
import { RouterModule } from '@angular/router';
import { OpenFormButtonModule } from '../open-form-button/open-form-button.module';

@NgModule({
  declarations: [AccordionItemComponent],
  imports: [
    CommonModule,
    CollapseButtonModule,
    RouterModule,
    OpenFormButtonModule,
  ],
  exports: [AccordionItemComponent],
})
export class AccordionItemModule {}
