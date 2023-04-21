import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginModule } from '../../components/login/login.module';
import { RegisterModule } from '../../components/register/register.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, LoginModule, RegisterModule],
  exports: [AuthComponent],
})
export class AuthModule {}
