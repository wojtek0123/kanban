import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormAddTaskService, FormType } from './form.service';
import { NgForm } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ADD_BOARD } from '../graphql/graphql.queries';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  typeOfForm: FormType = 'board';
  private formTypeSub: Subscription = new Subscription();

  constructor(
    private formAddTaskService: FormAddTaskService,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.formTypeSub = this.formAddTaskService.typeOfForm.subscribe(
      formType => {
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

  onSubmit(form: NgForm) {
    if (this.typeOfForm === 'board') {
      this.apollo
        .mutate({
          mutation: ADD_BOARD,
          variables: {
            name: form.value.boardName,
          },
        })
        .subscribe();
    }
    if (this.typeOfForm === 'column') {
      // this.boardsService.onAddColumn(form.value.columnName);
    }
    if (this.typeOfForm === 'task') {
      // this.boardsService.onAddTask({
      // title: form.value.taskName,
      // description: form.value.taskDescription,
      // });
    }
    this.formAddTaskService.onChangeFormVisibility();
  }
}
