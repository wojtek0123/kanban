import { NgModule } from '@angular/core';
import { MobileNavigationComponent } from './mobile-navigation.component';
import { CommonModule } from '@angular/common';
import { AccordionModule } from '../accordion/accordion.module';
import { LogoutButtonModule } from '../logout-button/logout-button.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MobileNavigationComponent],
  imports: [CommonModule, AccordionModule, LogoutButtonModule, RouterModule],
  exports: [MobileNavigationComponent],
})
export class MobileNavigationModule {}
