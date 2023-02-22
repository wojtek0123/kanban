import { Component, OnInit } from '@angular/core';
import { ContextMenuModalService } from '../../services/context-menu-modal.service';
import { Observable } from 'rxjs';
import { ApolloService } from '../../services/apollo.service';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-context-menu-modal',
  templateUrl: './context-menu-modal.component.html',
  styleUrls: ['./context-menu-modal.component.css'],
})
export class ContextMenuModalComponent implements OnInit {
  show$ = new Observable<boolean>();

  constructor(
    private contextMenuModalService: ContextMenuModalService,
    private apollo: ApolloService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.show$ = this.contextMenuModalService.show;
  }

  onHide() {
    this.contextMenuModalService.onHide();
  }

  onDelete() {
    this.contextMenuModalService.onHide();

    const id = this.contextMenuModalService.id;
    const type = this.contextMenuModalService.type;

    this.apollo
      .remove(id, type)
      .pipe(
        catchError(async error => {
          this.toastService.showToast(
            'warning',
            `Coudn&apos;t delete this ${type}`
          );
          throw new Error(error);
        })
      )
      .subscribe(() =>
        this.toastService.showToast(
          'confirm',
          `Successfully deleted this ${type}`
        )
      );
  }
}
