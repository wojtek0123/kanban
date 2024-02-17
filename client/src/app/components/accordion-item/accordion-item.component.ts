import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Project } from '../../models/project.model';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { Board } from 'src/app/models/board.model';
import { OpenFormButtonComponent } from '../open-form-button/open-form-button.component';
import { NgClass, NgFor, NgIf, AsyncPipe } from '@angular/common';
import { CollapseButtonComponent } from '../collapse-button/collapse-button.component';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CollapseButtonComponent,
    NgClass,
    NgFor,
    RouterLink,
    NgIf,
    OpenFormButtonComponent,
    AsyncPipe,
  ],
})
export class AccordionItemComponent implements OnInit {
  @Input() project!: Project;
  showContent = true;
  loggedInUserId$: Observable<string | undefined> | null = null;
  selectedBoardId$: Observable<string | undefined> | null = null;

  constructor(
    private supabase: SupabaseService,
    private route: ActivatedRoute,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.selectedBoardId$ = this.route.params.pipe(
      map(param => param['boardId'])
    );

    this.loggedInUserId$ = this.supabase.session$.pipe(
      map(session => session?.user.id ?? '')
    );
  }

  toggleShowContent(state: boolean) {
    this.showContent = state;
  }

  closeMenu() {
    this.navigationService.onMenu();
  }

  boardTrackBy(_index: number, board: Board) {
    return board.id;
  }
}
