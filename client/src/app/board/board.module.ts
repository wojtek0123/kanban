import { NgModule } from '@angular/core';
import { BoardComponent } from './board.component';
import { CommonModule } from '@angular/common';
import { MobileNavigationComponent } from './mobile-navigation/mobile-navigation.component';
import { ContextMenuModalComponent } from './context-menu-modal/context-menu-modal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ToastComponent } from './toast/toast.component';
import { AccordionModule } from './accordion/accordion.module';
import { BoardDetailsModule } from './board-details/board-details.module';
import { FormModule } from './form/form.module';
import { ContextMenuModalModule } from './context-menu-modal/context-menu-modal.module';
import { MobileNavigationModule } from './mobile-navigation/mobile-navigation.module';
import { ToastModule } from './toast/toast.module';

@NgModule({
  declarations: [BoardComponent],
  imports: [
    CommonModule,
    DragDropModule,
    AccordionModule,
    BoardDetailsModule,
    FormModule,
    ContextMenuModalModule,
    MobileNavigationModule,
    ToastModule,
  ],
  exports: [BoardComponent],
})
export class BoardModule {}
