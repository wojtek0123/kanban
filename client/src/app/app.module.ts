import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { BoardModule } from './features/board/board.module';
import { AppRoutingModule } from './app-routing.module';
import { ProjectsModule } from './features/projects/projects.module';
import { AuthModule } from './features/auth/auth.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    BoardModule,
    AuthModule,
    AppRoutingModule,
    ProjectsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
