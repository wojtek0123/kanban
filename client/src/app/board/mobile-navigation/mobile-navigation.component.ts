import { Component, Input } from '@angular/core';
import { Project, FormType } from '../../types';
import { FormService } from '../form/form.service';
import {
  animate,
  state,
  transition,
  trigger,
  style,
} from '@angular/animations';
import { NavigationService } from './navigation.service';
import { SupabaseService } from 'src/app/supabase.service';
import { Router } from '@angular/router';

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
  @Input() projects: Project[] | null = null;

  constructor(
    private formService: FormService,
    public navigationService: NavigationService,
    private supabase: SupabaseService,
    private router: Router
  ) {}

  onForm(type: FormType) {
    this.formService.onChangeFormVisibility(type);
  }

  async onLogout() {
    try {
      const { error } = await this.supabase.signOut();
      if (error) {
        console.error(error.message);
      }
      this.router.navigate(['/home']);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}
