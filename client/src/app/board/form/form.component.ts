import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormService, FormType } from './form.service';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ADD_BOARD } from '../../graphql/graphql.queries';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  typeOfForm: FormType = 'board';
  private formTypeSub: Subscription = new Subscription();

  boardForm = this.formBuilder.group({
    board: this.formBuilder.group({
      name: ['', Validators.required],
    }),
    column: this.formBuilder.group({
      name: ['', Validators.required],
    }),
    task: this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    }),
  });

  constructor(
    private formService: FormService,
    private apollo: Apollo,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formTypeSub = this.formService.typeOfForm.subscribe(formType => {
      this.typeOfForm = formType;
    });
  }

  ngOnDestroy(): void {
    this.formTypeSub.unsubscribe();
  }

  onClose() {
    this.formService.onChangeFormVisibility();
  }

  onSubmit() {
    console.log(this.boardForm.value);
    // if (this.typeOfForm === 'board') {
    //   this.apollo
    //     .mutate({
    //       mutation: ADD_BOARD,
    //       variables: {
    //         name: form.value.boardName,
    //       },
    //     })
    //     .subscribe();
    // }
    // if (this.typeOfForm === 'column') {
    //   // this.boardsService.onAddColumn(form.value.columnName);
    // }
    // if (this.typeOfForm === 'task') {
    //   // this.boardsService.onAddTask({
    //   // title: form.value.taskName,
    //   // description: form.value.taskDescription,
    //   // });
    // }
    // this.formAddTaskService.onChangeFormVisibility();
  }
}
