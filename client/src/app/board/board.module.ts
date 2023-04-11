import { NgModule } from '@angular/core';
import { BoardComponent } from './board.component';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AccordionModule } from './accordion/accordion.module';
import { BoardDetailsModule } from './board-details/board-details.module';
import { FormModule } from './form/form.module';
import { ContextMenuModalModule } from './context-menu-modal/context-menu-modal.module';
import { MobileNavigationModule } from './mobile-navigation/mobile-navigation.module';
import { ToastModule } from './toast/toast.module';
import { RouterModule } from '@angular/router';
import { OpenFormButtonModule } from './open-form-button/open-form-button.module';

@NgModule({
  declarations: [BoardComponent],
  imports: [
    CommonModule,
    RouterModule,
    DragDropModule,
    AccordionModule,
    BoardDetailsModule,
    FormModule,
    ContextMenuModalModule,
    MobileNavigationModule,
    ToastModule,
    OpenFormButtonModule,
  ],
  exports: [BoardComponent],
})
export class BoardModule {}
