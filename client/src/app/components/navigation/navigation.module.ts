import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component';
import { CommonModule } from '@angular/common';
import { OpenFormButtonModule } from 'src/app/components/open-form-button/open-form-button.module';
import { LogoutButtonModule } from 'src/app/components/logout-button/logout-button.module';

@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, OpenFormButtonModule, LogoutButtonModule],
  exports: [NavigationComponent],
})
export class NavigationModule {}
