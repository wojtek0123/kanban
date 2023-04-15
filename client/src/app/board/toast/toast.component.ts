import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';
import { Observable } from 'rxjs';
import { ToastType } from 'src/app/models/types';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent implements OnInit {
  message$ = new Observable<string>();
  show$ = new Observable<boolean>();
  type$ = new Observable<ToastType>();

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.message$ = this.toastService.message$;
    this.show$ = this.toastService.show$;
    this.type$ = this.toastService.type$;
  }

  onClose() {
    this.toastService.closeToast();
  }
}
