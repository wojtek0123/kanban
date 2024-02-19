import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form/form.service';
import { Observable, Subject } from 'rxjs';
import { ApolloService } from '../../services/apollo/apollo.service';
import { Project } from '../../models/project.model';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Board } from '../../models/board.model';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { MobileNavigationComponent } from '../../components/mobile-navigation/mobile-navigation.component';
import { OpenFormButtonComponent } from '../../components/open-form-button/open-form-button.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { ContextMenuModalComponent } from '../../components/context-menu-modal/context-menu-modal.component';
import { FormComponent } from '../../components/form/form.component';
import { ToastComponent } from '../../components/toast/toast.component';
import { AsideComponent } from './components/aside/aside.component';
import { BoardComponent } from './components/board/board.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
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
    MobileNavigationComponent,
    LoadingSpinnerComponent,
    AsyncPipe,
    AsideComponent,
    RouterOutlet,
    BoardComponent,
  ],
})
export class ProjectComponent implements OnInit {
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
    console.log(this.route.params);
  }
}
