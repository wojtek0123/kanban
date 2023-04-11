import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Project } from '../../models/project.model';
import { Board } from '../../models/board.model';
import { BoardService } from '../../services/board.service';
import { FormService } from '../../services/form.service';
import { NavigationService } from '../../services/navigation.service';
import { SupabaseService } from 'src/app/services/supabase.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItemComponent implements OnInit {
  @Input() project!: Project;
  showContent = true;
  loggedInUserId$: Observable<string | undefined> | null = null;
  selectedBoardId$: Observable<string | undefined> | null = null;

  constructor(
    private boardService: BoardService,
    private formService: FormService,
    private supabase: SupabaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.selectedBoardId$ = this.route.params.pipe(
      map(param => param['boardId'])
    );

    this.loggedInUserId$ = this.supabase.getSessionObs.pipe(
      map(session => session?.user.id ?? '')
    );
  }

  toggleShowContent(state: boolean) {
    this.showContent = state;
  }
}
