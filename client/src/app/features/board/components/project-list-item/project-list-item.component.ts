import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProjectAndBoardNames } from '../../../../graphql/queries/project-and-board-names.query';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ActionsComponent } from '../../../../shared/components/actions/actions.component';
import { CollapseButtonComponent } from '../collapse-button/collapse-button.component';

@Component({
  selector: 'app-project-list-item',
  template: `
    <app-collapse-button
      [project]="project()"
      (toggleMenu)="toggleShowContent($event)"
      [showContent]="showContent"></app-collapse-button>
    <ul class="accordion-list" [ngClass]="{ show: showContent }">
      @for (board of project().boards; track board.id) {
      <li class="item">
        <a
          [routerLink]="['/project', project().id, 'board', board.id]"
          routerLinkActive="highlight"
          class="accordion-item"
          >{{ board.name }}</a
        >
      </li>
      } @empty {
      <span class="accordion-item accordion-item-paragraph"> No boards </span>
      }
    </ul>
  `,
  styleUrl: './project-list-item.component.css',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive,
    ActionsComponent,
    CollapseButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListItemComponent {
  project = input.required<ProjectAndBoardNames>();

  showContent = true;

  toggleShowContent(state: boolean) {
    this.showContent = state;
  }
}
