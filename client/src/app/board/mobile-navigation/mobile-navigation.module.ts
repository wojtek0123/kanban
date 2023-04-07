import { NgModule } from '@angular/core';
import { MobileNavigationComponent } from './mobile-navigation.component';
import { CommonModule } from '@angular/common';
import { AccordionModule } from '../accordion/accordion.module';
import { LogoutButtonModule } from '../logout-button/logout-button.module';

@NgModule({
  declarations: [MobileNavigationComponent],
  imports: [CommonModule, AccordionModule, LogoutButtonModule],
  exports: [MobileNavigationComponent],
})
export class MobileNavigationModule {}
