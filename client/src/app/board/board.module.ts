import { NgModule } from '@angular/core';
import { AccordionComponent } from './accordion/accordion.component';
import { BoardComponent } from './board.component';
import { FormComponent } from './form/form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MobileNavigationComponent } from './mobile-navigation/mobile-navigation.component';
import { BoardDetailsComponent } from './board-details/board-details.component';
import { ContextMenuComponent } from './board-details/context-menu/context-menu.component';
import { ContextMenuModalComponent } from './board-details/context-menu-modal/context-menu-modal.component';

@NgModule({
  declarations: [
    FormComponent,
    BoardComponent,
    AccordionComponent,
    MobileNavigationComponent,
    BoardDetailsComponent,
    ContextMenuComponent,
    ContextMenuModalComponent,
  ],
  imports: [BrowserAnimationsModule, ReactiveFormsModule, CommonModule],
  exports: [BoardComponent],
})
export class BoardModule {}
