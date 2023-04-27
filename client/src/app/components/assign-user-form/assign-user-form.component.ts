import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ApolloService } from 'src/app/services/apollo/apollo.service';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TabNameAssign } from 'src/app/models/types';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-assign-user-form',
  templateUrl: './assign-user-form.component.html',
  styleUrls: ['./assign-user-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignUserFormComponent implements OnInit {
  taskId$ = new Observable<string>();
  projectUsers$: Observable<{ user: User }[]> | null = null;
  assignedUsers$: Observable<{ user: User }[]> | null = null;
  tabName$ = new Observable<TabNameAssign>();
  isUserAssign$: Observable<string[]> = new Observable<string[]>();
  isOwner$ = new Observable<boolean>();

  constructor(
    private apollo: ApolloService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    const projectId$ = this.route.params.pipe(map(param => param['projectId']));

    this.taskId$ = this.formService.parentId$;
    this.tabName$ = this.formService.assignUserTabName$;
    this.isOwner$ = this.apollo.isLoggedInUserAOwnerOfTheProject$;

    this.projectUsers$ = projectId$.pipe(
      switchMap(projectId => this.apollo.getUsersFromProject(projectId)),
      map(data => data.data.usersFromProject)
    );

    this.assignedUsers$ = this.taskId$.pipe(
      switchMap(taskId => this.apollo.getUsersFromTask(taskId)),
      map(data => data.data.usersFromTask)
    );
  }

  changeTab(tabName: TabNameAssign) {
    this.formService.onChangeTabName(tabName);
  }

  onAddUserToTask(userId: string) {
    this.taskId$
      .pipe(
        switchMap(taskId => this.apollo.addUserToTask(taskId, userId)),
        catchError(async error => {
          this.toastService.showToast('warning', `Couldn't assign this user`);
          throw new Error(error);
        }),
        take(1)
      )
      .subscribe(() =>
        this.toastService.showToast(
          'confirm',
          'Successfully assigned this user'
        )
      );
  }

  onRemoveUserFromTask(userId: string) {
    this.taskId$
      .pipe(
        switchMap(taskId => this.apollo.removeUserFromTask(taskId, userId)),
        catchError(async error => {
          this.toastService.showToast(
            'warning',
            `Couldn't remove this user from this task`
          );
          throw new Error(error);
        }),
        take(1)
      )
      .subscribe(() =>
        this.toastService.showToast(
          'confirm',
          'Successfully remove this user from this task'
        )
      );
  }

  assignedUserTrackBy(_index: number, data: { user: User }) {
    return data.user.id;
  }

  projectUserTrackBy(_index: number, data: { user: User }) {
    return data.user.id;
  }
}
