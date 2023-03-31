import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, LoginModule, RegisterModule],
  exports: [HomeComponent],
})
export class HomeModule {}
