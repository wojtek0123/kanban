import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Project } from '../../../../models/project.model';
import { LoadingSpinnerModule } from '../../../../components/loading-spinner/loading-spinner.module';
import { OpenFormButtonModule } from '../../../../components/open-form-button/open-form-button.module';
import { ContextMenuModule } from '../../../../components/context-menu/context-menu.module';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GetTasksModule } from '../../../../pipes/get-tasks/get-tasks.module';
import { GetSubtasksModule } from '../../../../pipes/get-subtasks/get-subtasks.module';
import { ActionsComponent } from '../../../../shared/actions/actions.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css'],
  standalone: true,
  imports: [
    LoadingSpinnerModule,
    OpenFormButtonModule,
    ContextMenuModule,
    NgIf,
    NgFor,
    RouterLink,
    GetTasksModule,
    GetSubtasksModule,
    ActionsComponent,
    MatTableModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectTableComponent {
  @Input({ required: true }) projects: Project[] = [];

  columns = ['name', 'columns', 'tasks', 'subtasks', 'actions'];
}
