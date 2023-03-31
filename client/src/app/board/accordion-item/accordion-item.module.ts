import { NgModule } from '@angular/core';
import { AccordionItemComponent } from './accordion-item.component';
import { CommonModule } from '@angular/common';
import { CollapseButtonModule } from '../collapse-button/collapse-button.module';

@NgModule({
  declarations: [AccordionItemComponent],
  imports: [CommonModule, CollapseButtonModule],
  exports: [AccordionItemComponent],
})
export class AccordionItemModule {}
