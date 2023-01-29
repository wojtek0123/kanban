import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormService } from '../form/form.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-wrapper',
  templateUrl: './form-wrapper.component.html',
  styleUrls: ['./form-wrapper.component.css'],
})
export class FormWrapperComponent implements OnInit, OnDestroy {
  show!: boolean;
  showSubscription!: Subscription;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.showSubscription = this.formService.isFormOpen.subscribe(
      state => (this.show = state)
    );
  }

  ngOnDestroy(): void {
    this.showSubscription.unsubscribe();
  }

  close(event: Event) {
    const target = event.target as HTMLDivElement;

    if (!target.classList.contains('backdrop')) {
      return;
    }

    this.formService.onChangeFormVisibility();
  }
}
