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
  typeSubscription!: Subscription;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.typeSubscription = this.formService.typeOfForm.subscribe(
      type => (this.typeOfForm = type)
    );
  }

  ngOnDestroy(): void {
    this.typeSubscription.unsubscribe();
  }

  onClose() {
    this.formService.onChangeFormVisibility();
  }
}
