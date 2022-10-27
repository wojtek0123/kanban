import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BoardsService } from '../boards.service';
import { FormAddTaskService, FormType } from './form.service';
import { NgForm } from '@angular/forms';

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
    private boardsService: BoardsService
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
      this.boardsService.onAddBoard(form.value.boardName);
    }
    if (this.typeOfForm === 'column') {
      this.boardsService.onAddColumn(form.value.columnName);
    }
    if (this.typeOfForm === 'task') {
    }
    this.formAddTaskService.onChangeFormVisibility();
  }
}
