import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit, OnDestroy {
  message!: string;
  show = false;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.message.subscribe(message => (this.message = message));
    this.toastService.show.subscribe(show => (this.show = show));
  }

  ngOnDestroy() {
    console.log('Destroy');
  }

  onClose() {
    this.toastService.closeToast();
  }
}
