import { trigger, state, style, transition, animate } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
import { Observable, map } from 'rxjs';
import { ContextMenuComponent } from '../../../../components/context-menu/context-menu.component';
import { NgOptimizedImage, NgIf, AsyncPipe } from '@angular/common';
import { ProjectAndBoardNames } from '../../../../graphql/queries/get-project-and-board-names.query';
import { ActionsComponent } from '../../../../shared/components/actions/actions.component';

@Component({
  selector: 'app-collapse-button',
  templateUrl: './collapse-button.component.html',
  styleUrls: ['./collapse-button.component.css'],
  animations: [
    trigger('rotateState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(180deg)' })),
      transition('default<=>rotated', animate('250ms')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgOptimizedImage, NgIf, ContextMenuComponent, AsyncPipe, ActionsComponent],
})
export class CollapseButtonComponent implements OnInit {
  project = input.required<ProjectAndBoardNames>();
  @Output() toggleMenu = new EventEmitter<boolean>();
  @Input() showContent!: boolean;
  loggedInUserId$: Observable<string> | null = null;

  constructor(private supabase: SupabaseService) {}

  ngOnInit(): void {
    this.loggedInUserId$ = this.supabase.session$.pipe(map(session => session?.user.id ?? ''));
  }

  toggleShowContent() {
    this.showContent = !this.showContent;
    this.toggleMenu.emit(this.showContent);
  }
}
