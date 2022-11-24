import { Component, Input } from '@angular/core';
import { Project } from '../board.component';
import { FormService, FormType } from '../form/form.service';
import {
  animate,
  state,
  transition,
  trigger,
  style,
} from '@angular/animations';
import { NavigationService } from './navigation.service';

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
})
export class MobileNavigationComponent {
  @Input() projects!: Project[];

  constructor(
    private formService: FormService,
    public navigationService: NavigationService
  ) {}

  onForm(type: FormType) {
    this.formService.onChangeFormVisibility(type);
  }
}
