import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form/form.service';
import { FormType } from '../../models/types';
import { Observable } from 'rxjs';
import { UserTasksComponent } from '../user-tasks/user-tasks.component';
import { ProfileComponent } from '../profile/profile.component';
import { AssignUserFormComponent } from '../assign-user-form/assign-user-form.component';
import { UsersComponent } from '../users/users.component';
import { SubtaskFormComponent } from '../subtask-form/subtask-form.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ColumnFormComponent } from '../column-form/column-form.component';
import { BoardFormComponent } from '../board-form/board-form.component';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { FormWrapperComponent } from '../form-wrapper/form-wrapper.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormWrapperComponent,
    NgIf,
    ProjectFormComponent,
    BoardFormComponent,
    ColumnFormComponent,
    TaskFormComponent,
    SubtaskFormComponent,
    UsersComponent,
    AssignUserFormComponent,
    ProfileComponent,
    UserTasksComponent,
    AsyncPipe,
  ],
})
export class FormComponent implements OnInit {
  typeOfForm$!: Observable<FormType | undefined>;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.typeOfForm$ = this.formService.getTypeOfForm;
  }

  onClose() {
    this.formService.onChangeFormVisibility();
  }
}
