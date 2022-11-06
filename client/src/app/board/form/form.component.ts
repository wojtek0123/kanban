import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormService, FormType } from './form.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import {
  GET_BOARDS,
  ADD_BOARD,
  ADD_COLUMN,
  ADD_TASK,
} from 'src/app/graphql/graphql.schema';
import { Board } from '../board.component';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit, OnDestroy {
  typeOfForm: FormType = 'board';
  private subscriptions: Subscription[] = [];

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
    private formBuilder: FormBuilder,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    const subscription = this.formService.typeOfForm.subscribe(formType => {
      this.typeOfForm = formType;
    });
    this.subscriptions = [...this.subscriptions, subscription];
  }

  onClose() {
    this.formService.onChangeFormVisibility();
  }

  onSubmit() {
    console.log(this.boardForm.value);
    if (this.typeOfForm === 'board') {
      const mutationSubscription = this.apollo
        .mutate<{ AddBoard: Board }>({
          mutation: ADD_BOARD,
          variables: {
            name: this.boardForm.value.board?.name,
          },
          refetchQueries: [{ query: GET_BOARDS }],
        })
        .subscribe(result => {
          console.log(result);
        });

      this.subscriptions = [...this.subscriptions, mutationSubscription];
    }
    if (this.typeOfForm === 'column') {
      const mutationSubscription = this.apollo
        .mutate({
          mutation: ADD_COLUMN,
          variables: {
            name: this.boardForm.value.column?.name,
            boardId: this.boardService.selectedBoardId.value,
          },
          refetchQueries: [{ query: GET_BOARDS }],
        })
        .subscribe(result => {
          console.log(result);
        });
      this.subscriptions = [...this.subscriptions, mutationSubscription];
    }
    if (this.typeOfForm === 'task') {
      const mutationSubscription = this.apollo
        .mutate({
          mutation: ADD_TASK,
          variables: {
            title: this.boardForm.value.task?.title,
            description: this.boardForm.value.task?.description,
            columnId: this.boardService.selectedColumnId.value,
          },
          refetchQueries: [{ query: GET_BOARDS }],
        })
        .subscribe(result => {
          console.log(result);
        });
      this.subscriptions = [...this.subscriptions, mutationSubscription];
    }
    this.formService.onChangeFormVisibility();
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      if (sub && sub.unsubscribe) {
        sub.unsubscribe();
      }
    }
  }
}
