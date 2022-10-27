import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormAddTaskService, FormType } from './form-add-task.service';

@Component({
  selector: 'app-form-add-task',
  templateUrl: './form-add-task.component.html',
  styleUrls: ['./form-add-task.component.css'],
})
export class FormAddTaskComponent implements OnInit, OnDestroy {
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
