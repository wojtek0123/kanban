import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Project } from '../../../../models/project.model';
import { LoadingSpinnerModule } from '../../../../components/loading-spinner/loading-spinner.module';
import { OpenFormButtonModule } from '../../../../components/open-form-button/open-form-button.module';
import { ContextMenuModule } from '../../../../components/context-menu/context-menu.module';
import { NgFor, NgIf } from '@angular/common';
import { Board } from '../../../../models/board.model';
import { RouterLink } from '@angular/router';
import { GetTasksPipe } from '../../../../pipes/get-tasks/get-tasks.pipe';
import { GetTasksModule } from '../../../../pipes/get-tasks/get-tasks.module';
import { GetSubtasksModule } from '../../../../pipes/get-subtasks/get-subtasks.module';
import { ActionsComponent } from '../../../../shared/actions/actions.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
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
export class ProjectListComponent {
  @Input({ required: true }) projects: Project[] = [];

  columns = ['name', 'columns', 'tasks', 'subtasks', 'actions'];

  projectTrackBy(_index: number, project: Project) {
    return project.id;
  }

  boardTrackBy(_index: number, board: Board) {
    return board.id;
  }
}
