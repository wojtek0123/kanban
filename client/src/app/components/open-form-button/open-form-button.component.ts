import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { FormType, TabNameAssign } from '../../models/types';
import { ApolloService } from '../../services/apollo/apollo.service';
import { FormService } from '../../services/form/form.service';

@Component({
  selector: 'app-open-form-button',
  templateUrl: './open-form-button.component.html',
  styleUrls: ['./open-form-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  isOwner$ = new Observable<boolean>();

  constructor(
    private formService: FormService,
    private apollo: ApolloService
  ) {}

  ngOnInit() {
    this.isOwner$ = this.apollo.isLoggedInUserAOwnerOfTheProject$;
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
      console.log('TRUE');
      this.formService.onRedirect(true);
    } else {
      console.log('FALSE');
      this.formService.onRedirect(false);
    }

    if (!this.parentId) return;
    this.formService.onChangeParentId(this.parentId);
  }
}
