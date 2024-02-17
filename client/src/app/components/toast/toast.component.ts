import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';
import { Observable } from 'rxjs';
import { ToastType } from 'src/app/models/types';
import { NgClass, NgOptimizedImage, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, NgOptimizedImage, AsyncPipe],
})
export class ToastComponent implements OnInit {
  show$ = new Observable<boolean>();
  toast$ = new Observable<{ type: ToastType; message: string }>();

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.show$ = this.toastService.show$;
    this.toast$ = this.toastService.toast$;
  }

  onClose() {
    this.toastService.closeToast();
  }
}
