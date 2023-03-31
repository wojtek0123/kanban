import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [RouterModule],
  exports: [PageNotFoundComponent],
})
export class PageNotFoundModule {}
