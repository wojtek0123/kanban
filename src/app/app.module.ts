import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormAddTaskComponent } from './form-add-task/form-add-task.component';

@NgModule({
  declarations: [AppComponent, FormAddTaskComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
