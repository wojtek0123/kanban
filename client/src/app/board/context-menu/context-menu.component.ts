import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormService } from '../../services/form/form.service';
import { Project } from '../../models/project.model';
import { FormType } from '../../models/types';
import { ContextMenuModalService } from '../../services/context-menu-modal/context-menu-modal.service';
import { Observable } from 'rxjs';
import { ApolloService } from '../../services/apollo/apollo.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuComponent implements OnInit {
  @Input() id: string = '';
  @Input() type!: FormType;
  @Input() editingProject?: Project;
  @Input() isProtected = true;
  @Input() whichSide: 'left' | 'right' = 'left';
  show = false;
  isOwner$ = new Observable<boolean>();

  constructor(
    private formService: FormService,
    private contextMenuModalService: ContextMenuModalService,
    private apollo: ApolloService
  ) {}

  ngOnInit() {
    this.isOwner$ = this.apollo.isLoggedInUserAOwnerOfTheProject$;
  }

  onToggle() {
    this.show = !this.show;
  }

  onDelete() {
    this.contextMenuModalService.onShow(this.type, this.id);
    this.show = false;
  }

  onEdit() {
    this.show = false;
    this.formService.onEdit(this.type, this.id, this.editingProject);
  }
}
