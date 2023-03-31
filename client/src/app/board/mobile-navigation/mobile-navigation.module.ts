import { NgModule } from '@angular/core';
import { MobileNavigationComponent } from './mobile-navigation.component';
import { CommonModule } from '@angular/common';
import { AccordionModule } from '../accordion/accordion.module';

@NgModule({
  declarations: [MobileNavigationComponent],
  imports: [CommonModule, AccordionModule],
  exports: [MobileNavigationComponent],
})
export class MobileNavigationModule {}
