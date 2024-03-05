import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ApolloService } from '../../../../services/apollo/apollo.service';
import { catchError, ignoreElements } from 'rxjs/operators';
import { of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProjectListItemComponent } from '../project-list-item/project-list-item.component';
import { LoadingSpinnerComponent } from 'src/app/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-project-list',
  template: `
    @if ({projects: projects$ | async, projectsError: projectsError$ | async}; as vm) { @if (vm.projects &&
    !vm.projectsError) {
    <div class="h-full">
      @for (project of vm.projects; track project.id) {
      <div class="">
        <app-project-list-item [project]="project"></app-project-list-item>
      </div>
      } @empty {
      <span class="block text-center">No projects to display</span>
      }
    </div>
    } @if (!vm.projects && vm.projectsError) {
    <span class="block text-center">{{ vm.projectsError }}</span>
    } @if (!vm.projects && !vm.projectsError) {
    <app-loading-spinner></app-loading-spinner>
    }}
  `,
  styleUrl: './project-list.component.css',
  standalone: true,
  imports: [AsyncPipe, ProjectListItemComponent, LoadingSpinnerComponent],
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
