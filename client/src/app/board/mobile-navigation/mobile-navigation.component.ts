import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormType } from '../../models/types';
import { FormService } from '../../services/form.service';
import {
  animate,
  state,
  transition,
  trigger,
  style,
} from '@angular/animations';
import { NavigationService } from '../../services/navigation.service';
import { SupabaseService } from 'src/app/services/supabase.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
})
export class MobileNavigationComponent implements OnInit {
  showMenu$!: Observable<boolean>;

  constructor(
    private formService: FormService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.showMenu$ = this.navigationService.getShowMenu();
  }

  onMenu() {
    this.navigationService.onMenu();
  }

  onForm(type: FormType) {
    this.formService.onChangeFormVisibility(type);
  }
}
