import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectListComponent } from '../project-list/project-list.component';
import { OpenFormButtonComponent } from '../../../../components/open-form-button/open-form-button.component';

@Component({
  selector: 'app-aside',
  template: `
    <aside class="board-sidebar">
      <h2 class="logo">
        <a routerLink="/projects">KanBan</a>
      </h2>
      <div class="board-wrapper">
        <app-project-list></app-project-list>
      </div>
      <div class="board-button-wrapper">
        <app-open-form-button
          text="Add project"
          type="project"
          size="wide"></app-open-form-button>
      </div>
    </aside>
  `,
  styleUrl: './aside.component.css',
  standalone: true,
  imports: [RouterLink, ProjectListComponent, OpenFormButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideComponent {}
