import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormService } from './form.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormType } from '../../types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  typeOfForm!: FormType;
  show!: boolean;
  showSubscription!: Subscription;
  typeSubscription!: Subscription;

  constructor(
    private formService: FormService,
    private formBuilder: FormBuilder
  ) {}

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

  fillEditTags() {
    const names = this.formService.editingTask?.tagNames;
    const fontColors = this.formService.editingTask?.tagFontColors;
    const backgroundColors = this.formService.editingTask?.tagBackgroundColors;

    const result = [];

    if (!names || !fontColors || !backgroundColors) {
      return;
    }

    for (let i = 0; i < names.length; i++) {
      const group = new FormGroup({
        name: this.formBuilder.control(names[i], [Validators.required]),
        fontColor: this.formBuilder.control(fontColors[i]),
        backgroundColor: this.formBuilder.control(backgroundColors[i]),
      });
      result.push(group);
    }

    return result;
  }

  onClose() {
    this.formService.onChangeFormVisibility();
  }
}
