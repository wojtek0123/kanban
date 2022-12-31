import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormService } from './form.service';
import { FormType } from '../../types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  typeOfForm!: FormType | undefined;
  show!: boolean;
  showSubscription!: Subscription;
  typeSubscription!: Subscription;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.typeSubscription = this.formService.typeOfForm.subscribe(
      type => (this.typeOfForm = type)
    );
    this.showSubscription = this.formService.isFormOpen.subscribe(
      state => (this.show = state)
    );
  }

  ngOnDestroy(): void {
    this.showSubscription.unsubscribe();
    this.typeSubscription.unsubscribe();
  }

  close(event: Event) {
    const target = event.target as HTMLDivElement;

    if (!target.classList.contains('backdrop')) {
      return;
    }

    this.formService.onChangeFormVisibility();
  }

  onClose() {
    this.formService.onChangeFormVisibility();
  }
}
