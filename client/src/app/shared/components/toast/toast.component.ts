import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastService } from '../../../services/toast/toast.service';
import { NgClass, NgOptimizedImage, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, NgOptimizedImage, AsyncPipe],
})
export class ToastComponent {
  show$ = this.toastService.show$;
  toast$ = this.toastService.toast$;

  constructor(private toastService: ToastService) {}

  onClose() {
    this.toastService.closeToast();
  }
}
