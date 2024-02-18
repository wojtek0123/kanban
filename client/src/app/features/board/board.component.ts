import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormService } from '../../services/form/form.service';
import { Observable, Subject, combineLatest, of } from 'rxjs';
import { ApolloService } from '../../services/apollo/apollo.service';
import { catchError, ignoreElements, map, takeUntil } from 'rxjs/operators';
import { Project } from '../../models/project.model';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Board } from '../../models/board.model';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { MobileNavigationComponent } from '../../components/mobile-navigation/mobile-navigation.component';
import { BoardDetailsComponent } from '../../components/board-details/board-details.component';
import { OpenFormButtonComponent } from '../../components/open-form-button/open-form-button.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { ContextMenuModalComponent } from '../../components/context-menu-modal/context-menu-modal.component';
import { FormComponent } from '../../components/form/form.component';
import { ToastComponent } from '../../components/toast/toast.component';
import { AsideComponent } from './components/aside/aside.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ToastComponent,
    FormComponent,
    ContextMenuModalComponent,
    NgIf,
    RouterLink,
    ProjectListComponent,
    OpenFormButtonComponent,
    BoardDetailsComponent,
    MobileNavigationComponent,
    LoadingSpinnerComponent,
    AsyncPipe,
    AsideComponent,
    RouterOutlet,
  ],
})
export class BoardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  projects$: Observable<Project[]> | null = null;
  projectsError$: Observable<string> | null = null;
  board$ = new Observable<Board | undefined>();

  constructor(
    private formService: FormService,
    private apollo: ApolloService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const projectId$ = this.route.params.pipe(
      map(params => params['projectId'])
    );

    const boardId$ = this.route.params.pipe(map(params => params['boardId']));

    this.projects$ = this.apollo.getProjects();

    this.projectsError$ = this.projects$.pipe(
      ignoreElements(),
      catchError(error => of(error))
    );

    this.board$ = combineLatest([this.projects$, boardId$]).pipe(
      map(([projects, boardId]) =>
        projects.flatMap(project =>
          project.boards.filter(board => board.id === boardId)
        )
      ),
      map(boards => boards.filter(board => board).at(0))
    );

    combineLatest([this.projects$, projectId$])
      .pipe(
        map(([projects, projectId]) =>
          projects.find(project => project.id === projectId)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(project => {
        this.formService.onChangeProject(project);
        this.apollo.setProjectOwnerId(project?.userId ?? '');
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
