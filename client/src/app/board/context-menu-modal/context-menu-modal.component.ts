import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContextMenuModalService } from './context-menu-modal.service';
import { Subscription } from 'rxjs';
import { ApolloService } from '../apollo.service';

@Component({
  selector: 'app-context-menu-modal',
  templateUrl: './context-menu-modal.component.html',
  styleUrls: ['./context-menu-modal.component.css'],
})
export class ContextMenuModalComponent implements OnInit, OnDestroy {
  show = false;
  subscription: Subscription = new Subscription();

  constructor(
    private contextMenuModalService: ContextMenuModalService,
    private apollo: ApolloService
  ) {}

  ngOnInit() {
    this.subscription = this.contextMenuModalService.show.subscribe(value => {
      this.show = value;
    });
  }

  onHide() {
    this.contextMenuModalService.onHide();
  }

  onDelete() {
    this.contextMenuModalService.onHide();

    const id = this.contextMenuModalService.id;
    const type = this.contextMenuModalService.type;

    this.apollo.remove(id, type).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
