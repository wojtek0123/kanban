import { NgModule } from '@angular/core';
import { AccordionComponent } from './accordion/accordion.component';
import { BoardComponent } from './board.component';
import { FormComponent } from './form/form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MobileNavigationComponent } from './mobile-navigation/mobile-navigation.component';
import { BoardDetailsComponent } from './board-details/board-details.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ContextMenuModalComponent } from './context-menu-modal/context-menu-modal.component';
import { CollapseButtonComponent } from './collapse-button/collapse-button.component';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectFormComponent } from './project-form/project-form.component';
import { BoardFormComponent } from './board-form/board-form.component';
import { ColumnFormComponent } from './column-form/column-form.component';

@NgModule({
  declarations: [
    FormComponent,
    BoardComponent,
    AccordionComponent,
    MobileNavigationComponent,
    BoardDetailsComponent,
    ContextMenuComponent,
    ContextMenuModalComponent,
    CollapseButtonComponent,
    AccordionItemComponent,
    ProjectFormComponent,
    BoardFormComponent,
    ColumnFormComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    DragDropModule,
  ],
  exports: [BoardComponent],
})
export class BoardModule {}
