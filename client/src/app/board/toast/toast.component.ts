import { Component, OnInit } from '@angular/core';
import { ToastService } from './toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit {
  message$: Observable<string> | null = null;
  show$: Observable<boolean> | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.message$ = this.toastService.message;
    this.show$ = this.toastService.show;
  }

  onClose() {
    this.toastService.closeToast();
  }
}
