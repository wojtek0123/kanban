import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ApolloService } from '../../../../services/apollo/apollo.service';
import { catchError, ignoreElements } from 'rxjs/operators';
import { of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProjectListItemComponent } from '../project-list-item/project-list-item.component';

@Component({
  selector: 'app-project-list',
  template: `
    @if ({projects: projects$ | async, projectsError: projectsError$ | async};
    as vm) { @if (vm.projects && !vm.projectsError) {
    <div class="accordion-wrapper">
      @for (project of vm.projects; track project.id) {
      <div class="accordion-item-wrapper">
        <app-project-list-item [project]="project"></app-project-list-item>
      </div>
      } @empty {
      <span class="warning-message">No projects to display</span>
      }
    </div>
    } @else {
    <span>{{ vm.projectsError }}</span>
    } }
  `,
  styleUrl: './project-list.component.css',
  standalone: true,
  imports: [AsyncPipe, ProjectListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListComponent {
  private apollo = inject(ApolloService);

  projects$ = this.apollo.getProjectAndBoardNames();
  projectsError$ = this.projects$.pipe(
    ignoreElements(),
    catchError(err => of(err))
  );
}
