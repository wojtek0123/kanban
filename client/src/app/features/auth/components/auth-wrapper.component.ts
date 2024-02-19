import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-wrapper',
  template: `
    <header class="header">
      <div class="header-heading">
        <h1>Manage the tasks the simple and easy way with kanban app</h1>
      </div>
      <div class="container">
        <div class="home">
          <ng-content></ng-content>
        </div>
      </div>
    </header>
  `,
  styleUrl: './auth-wrapper.component.css',
  standalone: true,
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthWrapperComponent {}
