import { NgModule } from '@angular/core';
import { AccordionItemComponent } from './accordion-item.component';
import { CommonModule } from '@angular/common';
import { CollapseButtonModule } from '../collapse-button/collapse-button.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AccordionItemComponent],
  imports: [CommonModule, CollapseButtonModule, RouterModule],
  exports: [AccordionItemComponent],
})
export class AccordionItemModule {}
