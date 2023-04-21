import { NgModule } from '@angular/core';
import { BoardComponent } from './board.component';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AccordionModule } from '../../components/accordion/accordion.module';
import { BoardDetailsModule } from '../../components/board-details/board-details.module';
import { FormModule } from '../../components/form/form.module';
import { ContextMenuModalModule } from '../../components/context-menu-modal/context-menu-modal.module';
import { MobileNavigationModule } from '../../components/mobile-navigation/mobile-navigation.module';
import { ToastModule } from '../../components/toast/toast.module';
import { RouterModule } from '@angular/router';
import { OpenFormButtonModule } from '../../components/open-form-button/open-form-button.module';

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
