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
import { ShowElementPipe } from '../../pipes/show-element/show-element.pipe';
import { NgIf, NgOptimizedImage, NgClass, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgOptimizedImage, NgClass, AsyncPipe, ShowElementPipe],
})
export class ContextMenuComponent implements OnInit {
  @Input() id: string = '';
  @Input() type!: FormType;
  @Input() editingProject?: Project;
  @Input() isProtected = true;
  @Input() whichSide: 'left' | 'right' = 'left';
  @Input() deleteId?: string;
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
    if (this.deleteId) {
      this.contextMenuModalService.onShow(this.type, this.deleteId);
      this.show = false;
      return;
    }
    this.contextMenuModalService.onShow(this.type, this.id);
    this.show = false;
  }

  onEdit() {
    this.show = false;
    this.formService.onEdit(this.type, this.id, this.editingProject);
  }
}
