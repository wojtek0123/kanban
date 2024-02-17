import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Project } from '../../../../models/project.model';
import { LoadingSpinnerComponent } from '../../../../components/loading-spinner/loading-spinner.component';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GetTasksPipe } from '../../../../pipes/get-tasks/get-tasks.pipe';
import { GetSubtasksPipe } from '../../../../pipes/get-subtasks/get-subtasks.pipe';
import { ActionsComponent } from '../../../../shared/components/actions/actions.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    ActionsComponent,
    MatTableModule,
    LoadingSpinnerComponent,
    GetTasksPipe,
    GetSubtasksPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTableComponent {
  @Input({ required: true }) projects: Project[] = [];

  columns = ['name', 'columns', 'tasks', 'subtasks', 'actions'];
}
