import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormType } from 'src/app/models/types';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-open-form-button',
  templateUrl: './open-form-button.component.html',
  styleUrls: ['./open-form-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenFormButtonComponent {
  @Input() parentId: string | undefined = undefined;
  @Input() type!: FormType;
  @Input() text = '';
  @Input() size!: 'compact' | 'wide';
  @Input() enableSelectColumnForTask: boolean | undefined = undefined;

  constructor(private formService: FormService) {}

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

    if (!this.parentId) return;
    this.formService.onChangeParentId(this.parentId);
  }
}
