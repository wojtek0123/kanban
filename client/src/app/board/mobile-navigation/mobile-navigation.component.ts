import { Component, Input, OnInit } from '@angular/core';
import { FormType } from '../../models/types';
import { Project } from '../../models/project.model';
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
export class MobileNavigationComponent implements OnInit {
  @Input() projects: Project[] | null = null;
  showMenu!: boolean;

  constructor(
    private formService: FormService,
    private navigationService: NavigationService,
    private supabase: SupabaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.showMenu = this.navigationService.getShowMenu();
  }

  onMenu() {
    this.navigationService.onMenu();
  }

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
