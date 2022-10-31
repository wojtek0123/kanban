import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormService, FormType } from './form.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import {
  ADD_BOARD,
  ADD_COLUMN,
  ADD_TASK,
  GET_BOARDS,
} from '../../graphql/graphql.queries';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() selectedBoardId!: string;
  @Input() selectedColumnId!: string;
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
    if (this.typeOfForm === 'board') {
      this.apollo
        .mutate({
          mutation: ADD_BOARD,
          variables: {
            name: this.boardForm.value.board?.name,
          },
        })
        .subscribe((result: any) => {
          console.log(result);
        });
      this.apollo.watchQuery({ query: GET_BOARDS }).refetch();
    }
    if (this.typeOfForm === 'column') {
      this.apollo
        .mutate({
          mutation: ADD_COLUMN,
          variables: {
            name: this.boardForm.value.column?.name,
            boardId: this.selectedBoardId,
          },
        })
        .subscribe((result: any) => {
          console.log(result);
        });
    }
    if (this.typeOfForm === 'task') {
      this.apollo
        .mutate({
          mutation: ADD_TASK,
          variables: {
            title: this.boardForm.value.task?.title,
            description: this.boardForm.value.task?.description,
            columnId: this.selectedColumnId,
          },
        })
        .subscribe((result: any) => {
          console.log(result);
        });
    }
    this.formService.onChangeFormVisibility();
  }
}
