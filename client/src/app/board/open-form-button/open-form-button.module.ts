import { NgModule } from '@angular/core';
import { OpenFormButtonComponent } from './open-form-button.component';
import { CommonModule } from '@angular/common';
import { ShowElementModule } from 'src/app/pipes/show-element.module';

@NgModule({
  declarations: [OpenFormButtonComponent],
  imports: [CommonModule, ShowElementModule],
  exports: [OpenFormButtonComponent],
})
export class OpenFormButtonModule {}
