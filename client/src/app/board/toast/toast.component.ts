import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { Observable } from 'rxjs';
import { ToastType } from 'src/app/models/types';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit {
  message$: Observable<string> | null = null;
  show$: Observable<boolean> | null = null;
  type$: Observable<ToastType> | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.message$ = this.toastService.message;
    this.show$ = this.toastService.show;
    this.type$ = this.toastService.type;
  }

  onClose() {
    this.toastService.closeToast();
  }
}
