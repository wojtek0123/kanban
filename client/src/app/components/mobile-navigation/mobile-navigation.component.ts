import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormType } from '../../models/types';
import { FormService } from '../../services/form/form.service';
import {
  animate,
  state,
  transition,
  trigger,
  style,
} from '@angular/animations';
import { NavigationService } from '../../services/navigation/navigation.service';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { NgClass, NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectListComponent } from '../../features/board/components/project-list/project-list.component';

@Component({
  selector: 'app-mobile-navigation',
  templateUrl: './mobile-navigation.component.html',
  styleUrls: ['./mobile-navigation.component.css'],
  animations: [
    trigger('smoothSlide', [
      state(
        'initial',
        style({
          transform: 'translateX(-100%)',
        })
      ),
      state(
        'final',
        style({
          transform: 'translateX(0)',
        })
      ),
      transition('initial<=>final', animate('300ms')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    NgIf,
    LogoutButtonComponent,
    AsyncPipe,
    ProjectListComponent,
  ],
})
export class MobileNavigationComponent implements OnInit {
  showMenu$!: Observable<boolean>;
  @Input() projects: Project[] | null = [];

  constructor(
    private formService: FormService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.showMenu$ = this.navigationService.showMenu$;
  }

  onMenu() {
    this.navigationService.onMenu();
  }

  onForm(type: FormType) {
    this.formService.onChangeFormVisibility(type);
  }
}
