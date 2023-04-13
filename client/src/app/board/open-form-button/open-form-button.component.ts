import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { FormType, TabNameAssign } from 'src/app/models/types';
import { ApolloService } from 'src/app/services/apollo.service';
import { FormService } from 'src/app/services/form.service';

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

    if (!this.parentId) return;
    this.formService.onChangeParentId(this.parentId);
  }
}
