import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { BoardModule } from './board/board.module';
import { BoardComponent } from './board/board.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, GraphQLModule, HttpClientModule, BoardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
