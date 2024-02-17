import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { FormType, TabNameAssign } from '../../models/types';
import { FormService } from '../../services/form/form.service';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';
import { ApolloService } from 'src/app/services/apollo/apollo.service';
import { ShowElementPipe } from '../../pipes/show-element/show-element.pipe';
import { NgIf, NgClass, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-open-form-button',
  templateUrl: './open-form-button.component.html',
  styleUrls: ['./open-form-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgClass, AsyncPipe, ShowElementPipe],
})
export class OpenFormButtonComponent implements OnInit {
  @Input() parentId: string | undefined = undefined;
  @Input() type!: FormType;
  @Input() text = '';
  @Input() size!: 'compact' | 'wide' | 'minimal';
  @Input() enableSelectColumnForTask: boolean | undefined = undefined;
  @Input() isProtected = false;
  @Input() assignUserTabName?: TabNameAssign;
  @Input() redirectToNewBoard?: boolean;
  @Input() projectOwnerId?: string;
  userId$ = new Observable<string | undefined>();
  isOwner$ = new Observable<boolean>();

  constructor(
    private formService: FormService,
    private supabase: SupabaseService,
    private apollo: ApolloService
  ) {}

  ngOnInit() {
    this.userId$ = this.supabase.session$.pipe(
      map(session => session?.user.id)
    );

    const isLoggedInUserAOwnerOfTheProject$ =
      this.apollo.isLoggedInUserAOwnerOfTheProject$;

    this.isOwner$ = combineLatest([
      this.userId$,
      isLoggedInUserAOwnerOfTheProject$,
    ]).pipe(
      map(([userId, isLoggedInUserAOwnerOfTheProject]) => {
        if (this.projectOwnerId) {
          return userId === this.projectOwnerId;
        } else {
          return isLoggedInUserAOwnerOfTheProject;
        }
      })
    );
  }

  onForm() {
    if (
      this.type === 'see-tasks' ||
      this.type === 'profile' ||
      this.type === 'project' ||
      this.type === 'user'
    ) {
      this.formService.onChangeFormVisibility(this.type);
      return;
    }

    this.formService.onChangeFormVisibility(
      this.type,
      this.enableSelectColumnForTask
    );

    if (this.type === 'assign-user' && this.assignUserTabName) {
      this.formService.onChangeTabName(this.assignUserTabName);
    }

    if (this.redirectToNewBoard) {
      this.formService.onRedirect(true);
    } else {
      this.formService.onRedirect(false);
    }

    if (!this.parentId) return;
    this.formService.onChangeParentId(this.parentId);
  }
}
