import { Component, Input } from '@angular/core';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { OpenFormButtonComponent } from '../open-form-button/open-form-button.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  standalone: true,
  imports: [NgIf, OpenFormButtonComponent, LogoutButtonComponent],
})
export class NavigationComponent {
  @Input() showTasksButton: boolean = false;
}
