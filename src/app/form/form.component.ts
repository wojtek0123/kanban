import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormAddTaskService, FormType } from './form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  typeOfForm: FormType = 'board';
  private formTypeSub: Subscription = new Subscription();

  constructor(private formAddTaskService: FormAddTaskService) {}

  ngOnInit(): void {
    this.formTypeSub = this.formAddTaskService.typeOfForm.subscribe(
      (formType) => {
        console.log(formType);
        this.typeOfForm = formType;
      }
    );
  }

  ngOnDestroy(): void {
    this.formTypeSub.unsubscribe();
  }

  onClose() {
    this.formAddTaskService.onChangeFormVisibility();
  }
}
