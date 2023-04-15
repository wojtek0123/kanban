import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Project } from '../../models/project.model';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
import { Observable, map } from 'rxjs';

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
})
export class CollapseButtonComponent implements OnInit {
  @Input() project!: Project;
  @Output() toggleMenu = new EventEmitter<boolean>();
  @Input() showContent!: boolean;
  loggedInUserId$: Observable<string> | null = null;

  constructor(private supabase: SupabaseService) {}

  ngOnInit(): void {
    this.loggedInUserId$ = this.supabase.getSessionObs.pipe(
      map(session => session?.user.id ?? '')
    );
  }

  toggleShowContent() {
    this.showContent = !this.showContent;
    this.toggleMenu.emit(this.showContent);
  }
}
